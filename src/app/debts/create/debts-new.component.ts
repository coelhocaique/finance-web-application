import { Component, OnInit, Input } from '@angular/core';
import { DebtsService } from '../../_services/debts.service'
import * as moment from 'moment';
import { NotificationsComponent } from '../../notifications/notifications.component'
import { DebtRetrieval } from 'app/_models';
import { MONTH_NAMES } from "app/_helpers/constants"

@Component({
  selector: 'app-debts-new',
  templateUrl: './debts-new.component.html',
  styleUrls: ['./debts-new.component.scss'],
  providers: [NotificationsComponent]
})
export class DebtsNewComponent implements OnInit {

  tags: string[];
  types: string[];

  monthNames: string[] = MONTH_NAMES
  days: number[]

  @Input() 
  debt = {amount: '', 
          description: '', 
          installments: 0,
          next_month: false, 
          debt_date: '',
          debt_date_form: new Date(),
          tag: '', 
          type:''}

  constructor(private debtsService: DebtsService, private notification: NotificationsComponent) { }

  ngOnInit() {
    this.debtsService.retrieveCreation()
      .subscribe(
        data => {
          var response = data as DebtRetrieval
          this.types = response.types
          this.tags = response.tags
        });
    this.resetForm()                    
  }

  create(){
    var debtDate = moment(this.debt.debt_date_form).format('YYYY-MM-DD')
    this.debt.debt_date = debtDate
    
    this.debtsService.create(this.debt)
                     .subscribe(resp => {
                        this.notification.showNotification('Succesfully created!', resp.status)
                     });
    this.resetForm()
  }

  resetForm(){
    this.debt.description = ''
    this.debt.amount = ''
    this.debt.installments = 1
    this.debt.next_month = false,
    this.debt.debt_date_form = new Date()
    this.debt.tag = ''
    this.debt.type = ''
  }
}
