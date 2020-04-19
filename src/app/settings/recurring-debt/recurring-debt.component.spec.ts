import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RecurringDebtComponent } from './recurring-debt.component';

describe('RecurringDebtComponent', () => {
  let component: RecurringDebtComponent;
  let fixture: ComponentFixture<RecurringDebtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurringDebtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurringDebtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
