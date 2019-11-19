import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ParameterService } from 'app/_services/parameter.service';
import { Parameter, ParameterElement } from 'app/_models/parameter';
import { DebtsService } from 'app/_services/debts.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DialogComponent } from 'app/dialog/dialog.component';

const DISPLAYED_COLUMNS: Array<string> = ['value',
  'referenceDate',
  'actions'];

const COLUMN_NAMES = [{
  id: "value",
  value: "Threshold"
},
{
  id: "referenceDate",
  value: "Reference Date"
}
];

@Component({
  selector: 'app-debt-threshold',
  templateUrl: './debt-threshold.component.html',
  styleUrls: ['./debt-threshold.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class DebtThresholdComponent implements OnInit {

  addForm: FormGroup;

  parameters: Parameter[]

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, 
    private parameterService: ParameterService,
    private notification: NotificationsComponent,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm()
    this.getParameters()
  }
  
  create(){
    if (this.addForm.valid){
      let inputs = this.addForm.controls['inputs'].value
      inputs.forEach(element => {
        let parameter = {name: 'threshold', 
                        value: element.value, 
                        reference_date: element.referenceDate}
        this.parameterService.create(parameter).subscribe()
      });
      this.initForm()
      this.getParameters()
    }
  }

  delete(id: string) {
    this.parameterService.delete(id)
      .subscribe(resp => {
        this.notification.showNotification('Succesfully deleted!', resp.status);
        if (resp.status >= 200 && resp.status < 400) {
          setTimeout(() => {
            this.getParameters()
          }, 100)
        }
      });
  }

  getParameters(){
    this.parameterService.findByName('threshold')
      .subscribe(data => {
        this.parameters = data
          let arr: ParameterElement[] = this.parseData(this.parameters)
          this.dataSource = new MatTableDataSource(arr)
          setTimeout(() => {
            this.dataSource.paginator = this.paginator
            this.dataSource.sort = this.sort;
          });
      });
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {
        title: "Delete threshold",
        message: "Are you sure you want to delete this threshold?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      }
    });
  }

  hasFormData(){
    const control = < FormArray > this.addForm.controls['inputs'].value;
    return control.length > 0;
  }

  hasData(){
    return this.dataSource != null && this.dataSource.data != null && this.dataSource.data.length > 0
  }

  add() {
      const control = < FormArray > this.addForm.controls['inputs'];
      control.push(this.initLink());
  }

  remove(i: number) {
    const control = < FormArray > this.addForm.controls['inputs'];
    control.removeAt(i);
  }

  private initForm(){
    this.addForm = this.formBuilder.group({
      inputs: this.formBuilder.array([])
    });
  }

  private initLink() {
    return this.formBuilder.group({
      value: ['', Validators.required],
      referenceDate: ['', Validators.required]
    });
  }

  private parseData(parameters: Parameter[]): ParameterElement[] {
    let parameterElements: ParameterElement[] = []
    if (parameters == null) return parameterElements
    parameters.forEach(parameter => {
      let parameterElement: ParameterElement = {
        id: parameter.parameter_id,
        name: parameter.name,
        value: parseInt(parameter.value),
        creationDate: parameter.creation_date,
        referenceDate: this.formatReferenceDate(parameter.reference_date)
      }
      parameterElements.push(parameterElement)
    })
    return parameterElements
  }

  private formatReferenceDate(referenceDate: string) {
    var year = referenceDate.substring(0, 4)
    var month = parseInt(referenceDate.substring(4, 6))
    return DebtsService.monthNames[month - 1] + '-' + year
  }
}
