import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DebtsService } from '../_services/debts.service'
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from 'app/dialog/dialog.component';
import { DebtElement, Debt } from 'app/_models/debt';
import { ParameterService } from 'app/_services/parameter.service';
import { Parameter, CustomAttribute } from 'app/_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { THRESHOLD } from 'app/_helpers';

const DISPLAYED_COLUMNS: Array<string> = ['amount',
  'description',
  'installment',
  // 'debtDate',
  // 'type',
  // 'tag',
  // 'totalAmount',
  'actions'];

const COLUMN_NAMES = [
  {
    id: "amount",
    value: "Amount"

  },
  {
    id: "description",
    value: "Description"

  },
  {
    id: "totalAmount",
    value: "Debt Total Amount"
  },
  {
    id: "debtDate",
    value: "Debt Date"
  },
  {
    id: "installment",
    value: "Installment"
  },
  {
    id: "tag",
    value: "Tag"
  },
  {
    id: "type",
    value: "Type"
  }
];


@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class DebtsComponent implements OnInit {

  debts: Debt[];

  newDebtForm: FormGroup

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() search = { month: 0, year: 0 };

  @Input() loaded = false
  @Input() showForm = false
  totalAmount = 0;

  debtThreshold = 0;

  tags: string[];
  types: string[];

  constructor(
    private debtsService: DebtsService,
    private notification: NotificationsComponent,
    private dialog: MatDialog,
    private parameterService: ParameterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.showForm = false
    this.setDate()
    this.getDebts()
  }

  getDebts() {
    this.debtsService.getDebts(this.search.year, this.search.month)
      .subscribe(
        data => {
          this.debts = data as Debt[]
          let arr: DebtElement[] = this.parseData(this.debts)
          this.dataSource = new MatTableDataSource(arr)
          setTimeout(() => {
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort;
            this.totalAmount = this.calculateTotalAmount(this.debts);
            this.getThreshold()
            this.loaded = true
          });
        }
      );
  }

  delete(refCode: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: "Delete Debt",
        message: "Are you sure you want to delete this debt?"
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.debtsService.delete(refCode)
          .subscribe(resp => {
            this.notification.showNotification('Succesfully deleted!', resp.status);
            if (resp.status >= 200 && resp.status < 400) {
              setTimeout(() => {
                this.getDebts()
              }, 100)
            }
          });
      }
    });
  }

  setDate() {
    let today = new Date()
    this.search.month = today.getMonth() + 1;
    this.search.year = today.getFullYear()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (filterValue.length > 0) {
      this.totalAmount = this.calculation()
    } else {
      this.totalAmount = this.calculateTotalAmount(this.debts);
    }
  }

  hasData() {
    return this.dataSource != null && this.dataSource.data != null && this.dataSource.data.length > 0
  }

  initForm() {
    this.showForm = true
    this.debtsService.getTypes()
      .subscribe(
        data => {
          var response = data as CustomAttribute[]
          this.types = response.map(t => t.value) as Array<string>
        });

    this.debtsService.getTags()
      .subscribe(
        data => {
          var response = data as CustomAttribute[]
          this.tags = response.map(t => t.value) as Array<string>
        });
    
      this.initNewDebtForm()
  }

  cancel() {
    this.showForm = false
    this.newDebtForm.reset()
  }

  create() {
    if (this.newDebtForm.valid) {
      let debt = this.newDebtForm.value
      debt.debt_date = moment(debt.debt_date).format('YYYY-MM-DD')

      this.debtsService.create(debt)
        .subscribe(resp => {
          this.notification.showNotification('Succesfully created!', resp.status)
          this.initNewDebtForm()
          setTimeout(() => this.getDebts())
        });
    }
  }

  private initNewDebtForm(){
    this.newDebtForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      installments: [1, Validators.required],
      next_month: [false, Validators.required],
      debt_date: [new Date(), Validators.required],
      type: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }

  private getThreshold() {
    this.parameterService.find(THRESHOLD, this.search.year, this.search.month)
      .subscribe(data => {
        let parameters = data as Parameter[]
        if (parameters != null && parameters.length > 0) {
          this.debtThreshold = parameters.reduce((summ, v) => summ += parseInt(v.value), 0)
        }
      })
  }

  private parseData(debts: Debt[]): DebtElement[] {
    let debtElements: DebtElement[] = []
    if (debts == null) return debtElements

    debts.forEach(debt => {
      let debtElment: DebtElement = {
        id: debt.debt_id,
        description: debt.description,
        creationDate: debt.creation_date,
        totalAmount: debt.total_amount,
        tag: debt.tag,
        type: debt.type,
        installment: debt.installment_number + "/" + debt.installments,
        debtDate: debt.debt_date,
        amount: debt.amount,
        referenceCode: debt.reference_code
      }

      debtElements.push(debtElment)
    })

    return debtElements
  }

  private calculation() {
    return this.dataSource.filteredData.reduce((summ, v) => summ += parseInt(v.amount), 0)
  }

  private calculateTotalAmount(debts: Debt[]) {
    if (debts != null && debts.length > 0)
      return debts.reduce((summ, v) => summ += v.amount, 0)
    else
      return 0
  }
}
