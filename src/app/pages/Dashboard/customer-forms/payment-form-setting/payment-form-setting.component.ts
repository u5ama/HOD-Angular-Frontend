import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-payment-form-setting',
  templateUrl: './payment-form-setting.component.html',
  styleUrls: ['./payment-form-setting.component.css']
})
export class PaymentFormSettingComponent implements OnInit {
  paymentForm: FormGroup;
  constructor(private fb: FormBuilder,  private userService: UserService) { }

  ngOnInit(): void {
    this.initPaymentForm();
  }

  initPaymentForm() {
    this.paymentForm = this.fb.group({
      country: '',
      paymentScript: ['', Validators.compose([
        Validators.required,
      ])
      ],
    });
  }
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isLocationControlHasError(controlName: string, validationType: string): boolean {
    const control = this.paymentForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  addScript(){
    const controls = this.paymentForm.controls;
    if (this.paymentForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const paymentScript = {
      payment_script: controls.paymentScript.value,
    };
    console.log(paymentScript);
    this.userService.addPaymentScript(paymentScript).subscribe(res => {
      console.log(res);
      if (res.success === 'true'){
        this.paymentAlert();
      }
    });
  }

  paymentAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Script Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
}
