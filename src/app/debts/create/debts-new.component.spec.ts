import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtsNewComponent } from './debts-new.component';

describe('DebtsNewComponent', () => {
  let component: DebtsNewComponent;
  let fixture: ComponentFixture<DebtsNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtsNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
