import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeNewComponent } from './income-new.component';

describe('IncomeNewComponent', () => {
  let component: IncomeNewComponent;
  let fixture: ComponentFixture<IncomeNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
