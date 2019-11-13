import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationsComponent } from '../notifications/notifications.component';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from 'app/dialog/dialog.component';
import { IncomeService } from 'app/services/income.service';
import { DebtsService } from 'app/services/debts.service';
import { filter } from 'rxjs/operators';

declare interface IncomeElement {
  id: string,
  description: string,
  netAmount: number,
  grossAmount: number,
  referenceDate: string,
  discountAmount: number,
  additionalAmount: number
}

export interface IncomeResponse {    
  income_id: string,
  gross_amount: number,
  net_amount: number,
  additional_amount: number,
  discount_amount: number,
  description: string,
  receipt_date: string,
  reference_date: string,
  source_name: string
}

const DISPLAYED_COLUMNS: Array<string> = ['description',  
                                          'grossAmount', 
                                          'netAmount', 
                                          'referenceDate',             
                                          'discountAmount',
                                          'additionalAmount',
                                          'actions'];

const COLUMN_NAMES = [{
                          id: "description",
                          value: "Description."

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
  
  incomes: IncomeResponse[];

  dataSource;

  displayedColumns = DISPLAYED_COLUMNS 

  columnNames = COLUMN_NAMES

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  @Input() search = {month: '', year: 0};

  @Input() netTotal = 0;
  @Input() grossTotal = 0;

  constructor(private incomeService: IncomeService, private notification: NotificationsComponent,
    private dialog: MatDialog) { 
      
    }

  openDialog(id) : void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: {
          title: "Delete Income",
          message: "Are you sure you want to delete this income?"
        }
      });

      dialogRef.afterClosed().subscribe(result => {
          if(result){
            this.delete(id)
          }
      });
  }

  ngOnInit() {
    this.setDate()
    this.getIncomes()
  }

  getIncomes(){
    this.incomeService.getIncomes(this.search.year, this.search.month)
      .subscribe(
        data => {
          console.log(data)
          this.incomes = data as IncomeResponse[] 
          let arr: IncomeElement[] = this.parseData(this.incomes)
          this.dataSource = new MatTableDataSource(arr)
          setTimeout(() => {this.dataSource.paginator = this.paginator
                            this.dataSource.sort = this.sort;
                            this.netTotal = this.calculateNetAmount(this.incomes);
                            this.grossTotal = this.calculateGrossAmount(this.incomes);
          });
        }
      );
  }

  delete(id){
    this.incomeService.delete(id)
          .subscribe(resp => {
            this.notification.showNotification('Succesfully deleted!', resp.status);
            if(resp.status >= 200 && resp.status < 400){
              setTimeout(() => {
                            let element: HTMLElement = document.getElementById('query') as HTMLElement
                            element.click()
                          }, 100)  
            }  
          });
  }

  setDate(){
    let today = new Date()
    this.search.year = today.getFullYear()
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(filterValue.length > 0){
      this.netTotal = this.calculationNet()
      this.grossTotal = this.calculationGross()
    }else{
      this.netTotal = this.calculateNetAmount(this.incomes)
      this.grossTotal = this.calculateGrossAmount(this.incomes)
    }
  }

  calculationNet(){ 
    return this.dataSource.filteredData.reduce((summ, v) => summ += parseInt(v.netAmount), 0) 
  }

  calculateNetAmount(incomes: IncomeResponse[]){ 
    return incomes.reduce((summ, v) => summ+= v.net_amount, 0)
  }

  calculateGrossAmount(incomes: IncomeResponse[]){ 
    return incomes.reduce((summ, v) => summ+= v.gross_amount, 0)
  }

  calculationGross(){ 
    return this.dataSource.filteredData.reduce((summ, v) => summ += parseInt(v.grossAmount), 0) 
  }

  parseData(incomes: IncomeResponse[]): IncomeElement[] {
    let incomeElements: IncomeElement[] = []

    incomes.forEach(income => {   
      let incomeElement : IncomeElement =  { 
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

  private formatReferenceDate(referenceDate: string){
    var year = referenceDate.substring(0, 4)
    var month = parseInt(referenceDate.substring(4, 6))
    return DebtsService.monthNames[month - 1] + '-' + year
  }
}
