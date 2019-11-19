import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtThresholdComponent } from './debt-threshold.component';

describe('DebtThresholdComponent', () => {
  let component: DebtThresholdComponent;
  let fixture: ComponentFixture<DebtThresholdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtThresholdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtThresholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
