import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DialogComponent } from 'app/dialog/dialog.component';
import { CustomAttribute } from 'app/_models';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource } from '@angular/material';
import { DebtTagService } from 'app/_services/debt-tag.service';

const DISPLAYED_COLUMNS: Array<string> = ['value',
  'actions'];

const COLUMN_NAMES = [{
  id: "value",
  value: "Tag"
}
];

@Component({
  selector: 'app-debt-tag',
  templateUrl: './debt-tag.component.html',
  styleUrls: ['./debt-tag.component.scss'],
  providers: [NotificationsComponent, DialogComponent]
})
export class DebtTagComponent implements OnInit {

  addForm: FormGroup;

  customAttribute: CustomAttribute[]

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS

  columnNames = COLUMN_NAMES
  
  @Input() loaded = false

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder, 
    private service: DebtTagService,
    private notification: NotificationsComponent,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.initForm()
    this.getTags()
  }
  
  create(){
    if (this.addForm.valid){
      let inputs = this.addForm.controls['inputs'].value
      inputs.forEach(element => {
        this.service.create(element.value).subscribe(
          data => {
            setTimeout(() => {
              this.initForm()
              this.getTags()
            });
          }
        )
      });
    }
  }

  delete(id: string) {
    this.service.delete(id)
      .subscribe(resp => {
        this.notification.showNotification('Succesfully deleted!', resp.status);
        if (resp.status >= 200 && resp.status < 400) {
          setTimeout(() => {
            this.getTags()
          }, 100)
        }
      });
  }

  getTags(){
    this.service.retrieveAll()
      .subscribe(data => {
        this.loaded = true
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
        title: "Delete debt tag",
        message: "Are you sure you want to delete this debt tag?"
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
