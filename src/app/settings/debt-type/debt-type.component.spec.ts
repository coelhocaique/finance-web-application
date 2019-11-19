import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtTypeComponent } from './debt-type.component';

describe('DebtTypeComponent', () => {
  let component: DebtTypeComponent;
  let fixture: ComponentFixture<DebtTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
