import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFormSettingComponent } from './payment-form-setting.component';

describe('PaymentFormSettingComponent', () => {
  let component: PaymentFormSettingComponent;
  let fixture: ComponentFixture<PaymentFormSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentFormSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFormSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
