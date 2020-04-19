import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { DialogComponent } from 'app/dialog/dialog.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { RecurringDebtService } from 'app/_services/recurring-debt.service';
import { RecurringDebt, RecurringDebtRetrieval } from 'app/_models/recurring-debt';

const DISPLAYED_COLUMNS: Array<string> = ['amount',
  'description',
  'tag',
  'type',
  'actions'];

const COLUMN_NAMES = [
  {
    id: "amount",
    value: "Debt Amount"

  },
  {
    id: "description",
    value: "Description"

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
  selector: 'app-recurring-debt',
  templateUrl: './recurring-debt.component.html',
  styleUrls: ['./recurring-debt.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class RecurringDebtComponent implements OnInit {

  recurringDebts: RecurringDebt[];

  addForm: FormGroup

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() search = { month: 0, year: 0 };

  @Input() loaded = false
  @Input() showForm = false

  tags: string[];
  types: string[];

  constructor(
    private service: RecurringDebtService,
    private notification: NotificationsComponent,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.showForm = false
    this.initForm()
    this.getRecurringDebts()
  }

  getRecurringDebts() {
    this.service.retrieveAll()
      .subscribe(
        data => {
          this.loaded = true
          let recurringDebts = data as RecurringDebt[]
          this.recurringDebts = recurringDebts
          this.dataSource = new MatTableDataSource(this.recurringDebts)
          setTimeout(() => {
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort;
          })
        }
      )
  }

  delete(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: "Delete Recurring Debt",
        message: "Are you sure you want to delete this recurring debt?"
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id)
          .subscribe(resp => {
            this.notification.showNotification('Succesfully deleted!', resp.status);
            if (resp.status >= 200 && resp.status < 400) {
              setTimeout(() => {
                this.getRecurringDebts()
              }, 100)
            }
          });
      }
    });
  }

  hasData() {
    return this.dataSource != null && this.dataSource.data != null && this.dataSource.data.length > 0
  }

  initForm() {
    this.addForm = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    })

    if (this.types == null || this.tags == null){
      this.service.retrieveCreation()
        .subscribe(
          data => {
            var response = data as RecurringDebtRetrieval
            this.types = response.types
            this.tags = response.tags
          })
      }
  }

  create() {
    if (this.addForm.valid){
      let inputs = this.addForm.controls['inputs'].value
      inputs.forEach(element => {
        this.service.create(element).subscribe(
          data => {
            setTimeout(() => {
              this.getRecurringDebts()
              this.initForm()
            })
          }
        )
      })
    }
  }

  hasFormData(){
    const control = < FormArray > this.addForm.controls['inputs'].value;
    return control.length > 0;
  }

  add() {
      const control = < FormArray > this.addForm.controls['inputs'];
      control.push(this.initLink());
  }

  remove(i: number) {
    const control = < FormArray > this.addForm.controls['inputs'];
    control.removeAt(i);
  }

  private initLink() {
    return this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      tag: ['', Validators.required],
    });
  }
}
