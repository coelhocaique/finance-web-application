import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtTagComponent } from './debt-tag.component';

describe('DebtTagComponent', () => {
  let component: DebtTagComponent;
  let fixture: ComponentFixture<DebtTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
