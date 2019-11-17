import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import * as moment from 'moment';
import { IncomeService } from 'app/_services/income.service';
import { NotificationsComponent } from 'app/notifications/notifications.component';
import { DebtsService } from 'app/_services/debts.service';

@Component({
  selector: 'app-income-new',
  templateUrl: './income-new.component.html',
  styleUrls: ['./income-new.component.scss'],
  providers: [NotificationsComponent]
})
export class IncomeNewComponent implements OnInit {

  addForm: FormGroup;

  monthNames: string[] = DebtsService.monthNames
  
  @Input() 
  income = {
          gross_amount: '', 
          description: '', 
          received_at_form: new Date(),
          reference_date_form: new Date(),
          receipt_date: '',
          reference_date: '', 
          source_name: '',
          discounts: [],
          additions: [],
        }
          
  constructor(private formBuilder: FormBuilder, private incomeService: IncomeService,
    private notification: NotificationsComponent) { }

  ngOnInit() {
    this.setInitialDate()
    this.addForm = this.formBuilder.group({
      discounts: this.formBuilder.array([]),
      additions: this.formBuilder.array([])
    });
  }

  create(){
    this.income.discounts = this.addForm.get('discounts').value
    this.income.additions = this.addForm.get('additions').value
    var receiptDate = moment(this.income.received_at_form.toString()).format('YYYY-MM-DD')
    this.income.receipt_date = receiptDate
    var referenceDate = moment(this.income.reference_date_form.toString()).format('YYYYMM')
    this.income.reference_date = referenceDate
    this.incomeService.create(this.income)
                     .subscribe(resp => {
                        this.notification.showNotification('Succesfully created!', resp.status)
                     });
    this.ngOnInit()
  }

  initLink() {
    return this.formBuilder.group({
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  add(name: string) {
      const control = < FormArray > this.addForm.controls[name];
      control.push(this.initLink());
  }

  remove(i: number, name: string) {
    const control = < FormArray > this.addForm.controls[name];
    control.removeAt(i);
  }

  setInitialDate(){
    let date = new Date()
    this.income.received_at_form = date
    date = new Date()
    date.setMonth(date.getMonth() - 1);
    this.income.reference_date_form = date
    this.income.gross_amount = ''
    this.income.description = ''
    this.income.source_name = ''
  }
}
