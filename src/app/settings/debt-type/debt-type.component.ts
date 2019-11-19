import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DialogComponent } from 'app/dialog/dialog.component';
import { CustomAttribute } from 'app/_models';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { CustomAttributeService } from 'app/_services/custom-attribute.service';

const DISPLAYED_COLUMNS: Array<string> = ['value',
  'actions'];

const COLUMN_NAMES = [{
  id: "value",
  value: "Type"
}
];

@Component({
  selector: 'app-debt-type',
  templateUrl: './debt-type.component.html',
  styleUrls: ['./debt-type.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class DebtTypeComponent implements OnInit {

  addForm: FormGroup;

  customAttribute: CustomAttribute[]

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, 
    private customAttributeService: CustomAttributeService,
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
        let parameter = {property_name: 'debt_type', 
                        value: element.value}
        this.customAttributeService.create(parameter).subscribe()
      });
      this.initForm()
      this.getParameters()
    }
  }

  delete(id: string) {
    this.customAttributeService.delete(id)
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
    this.customAttributeService.findByPropertyName('debt_type')
      .subscribe(data => {
        this.customAttribute = data
          this.dataSource = new MatTableDataSource(this.customAttribute)
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
        title: "Delete debt type",
        message: "Are you sure you want to delete this debt type?"
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
      value: ['', Validators.required]
    });
  }
}
