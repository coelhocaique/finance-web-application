import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from 'app/dialog/dialog.component';
import { IncomeService } from 'app/_services/income.service';
import { Income, IncomeElement } from "../_models"
import { MONTH_NAMES } from "app/_helpers/constants"
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import * as moment from 'moment';

const DISPLAYED_COLUMNS: Array<string> = [
  'netAmount',
  'description',
  'actions'];

const COLUMN_NAMES = [{
  id: "description",
  value: "Description"

}, {
  id: "grossAmount",
  value: "Gross Amount"
},
{
  id: "netAmount",
  value: "Net Amount"
},
{
  id: "referenceDate",
  value: "Reference Date"
},
{
  id: "discountAmount",
  value: "Discount Amount"
},
{
  id: "additionalAmount",
  value: "Additional Amount"
}];

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class IncomeComponent implements OnInit {

  incomes: Income[];

  newIncomeForm: FormGroup

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() search = { month: null, year: 0 };

  @Input() netTotal = 0;
  @Input() grossTotal = 0;

  @Input() loaded = false;
  @Input() showForm = false

  constructor(
    private incomeService: IncomeService,
    private notification: NotificationsComponent,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setDate()
    this.getIncomes()
  }

  getIncomes() {
    this.incomeService.getIncomes(this.search.year, this.search.month)
      .subscribe(
        data => {
          this.loaded = true;
          this.incomes = data as Income[]
          let arr: IncomeElement[] = this.parseData(this.incomes)
          this.dataSource = new MatTableDataSource(arr)
          setTimeout(() => {
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort;
            this.netTotal = this.calculateNetAmount(this.incomes);
            this.grossTotal = this.calculateGrossAmount(this.incomes);
          });
        }
      );
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: "Delete Income",
        message: "Are you sure you want to delete this income?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.incomeService.delete(id)
          .subscribe(resp => {
            this.notification.showNotification('Succesfully deleted!', resp.status);
            if (resp.status >= 200 && resp.status < 400) {
              setTimeout(() => {
                this.getIncomes()
              }, 100)
            }
          });
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (filterValue.length > 0) {
      this.netTotal = this.filterNetAmount()
      this.grossTotal = this.filterGrossAmount()
    } else {
      this.netTotal = this.calculateNetAmount(this.incomes)
      this.grossTotal = this.calculateGrossAmount(this.incomes)
    }
  }

  hasData() {
    return this.dataSource != null && this.dataSource.data != null && this.dataSource.data.length > 0
  }

  initForm() {
    this.showForm = true
    this.newIncomeForm = this.formBuilder.group({
      gross_amount: ['', Validators.required],
      description: ['', Validators.required],
      source_name: ['', Validators.required],
      next_month: [false, Validators.required],
      reference_date: [new Date(), Validators.required],
      receipt_date: [new Date(), Validators.required],
      discounts: this.formBuilder.array([]),
      additions: this.formBuilder.array([]),
    });
  }

  create() {
    if (this.newIncomeForm.valid) {
      let income = this.newIncomeForm.value
      income.reference_date = moment(income.reference_date).format('YYYYMM')
      income.receipt_date = moment(income.receipt_date).format('YYYY-MM-DD')

      this.incomeService.create(income)
        .subscribe(resp => {
          this.notification.showNotification('Succesfully created!', resp.status)
          this.initForm()
          setTimeout(() => {
            this.getIncomes()
          }, 100);
        });
    }
  }

  cancel() {
    this.showForm = false
    this.newIncomeForm.reset()
  }

  add(name: string) {
    const control = <FormArray>this.newIncomeForm.controls[name];
    control.push(this.initLink());
  }

  remove(i: number, name: string) {
    const control = <FormArray>this.newIncomeForm.controls[name];
    control.removeAt(i);
  }

  reset(name: string) {
    let len = this.newIncomeForm.get(name).value.length
    while(len > 0){
      this.remove(len - 1, name)
      len -= 1
    }
  }

  hasLinkData(name:string){
    return this.newIncomeForm.get(name).value.length > 0
  }

  private initLink() {
    return this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  private setDate() {
    let today = new Date()
    this.search.year = today.getFullYear()
  }

  private parseData(incomes: Income[]): IncomeElement[] {
    let incomeElements: IncomeElement[] = []
    if (incomes == null) return incomeElements
    incomes.forEach(income => {
      let incomeElement: IncomeElement = {
        id: income.income_id,
        description: income.description,
        netAmount: income.net_amount,
        grossAmount: income.gross_amount,
        referenceDate: this.formatReferenceDate(income.reference_date),
        discountAmount: income.discount_amount,
        additionalAmount: income.additional_amount
      }
      incomeElements.push(incomeElement)
    })
    return incomeElements
  }

  private formatReferenceDate(referenceDate: string) {
    var year = referenceDate.substring(0, 4)
    var month = parseInt(referenceDate.substring(4, 6))
    return MONTH_NAMES[month - 1] + '-' + year
  }

  private filterNetAmount() {
    return this.dataSource.filteredData.reduce((summ, v) => summ += parseInt(v.netAmount), 0)
  }

  private filterGrossAmount() {
    return this.dataSource.filteredData.reduce((summ, v) => summ += parseInt(v.grossAmount), 0)
  }

  private calculateNetAmount(incomes: Income[]) {
    if (incomes != null) return incomes.reduce((summ, v) => summ += v.net_amount, 0)
    else return 0
  }

  private calculateGrossAmount(incomes: Income[]) {
    if (incomes != null) return incomes.reduce((summ, v) => summ += v.gross_amount, 0)
    else return 0
  }
}
