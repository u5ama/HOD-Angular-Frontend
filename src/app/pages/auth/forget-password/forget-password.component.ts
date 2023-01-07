import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {finalize, first, takeUntil} from 'rxjs/operators';
import {AuthenticationService} from '../../../core/store/_services/authentication.service';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  loading = false;
  btnText = true;
  error: any = '';
  private unsubscribe: Subject<any>;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private auth: AuthenticationService,
    public authNoticeService: AuthNoticeService,
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
    this.btnText = true;
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initRegistrationForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ]
    });
  }

  /**
   * Form Submit
   */
  submit() {
    const controls = this.forgotPasswordForm.controls;
    /** check form */
    if (this.forgotPasswordForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;
    this.btnText = false;

    const email = controls.email.value;
    this.auth
      .forgetPasword(email)
      .pipe(first())
      .subscribe(
        data => {
          this.authNoticeService.setNotice('Email Sent Successfully!', 'success');
          this.router.navigateByUrl('/auth/login');
        },
        error => {
          this.error = error;
          console.log( this.error);
          this.authNoticeService.setNotice('Email Not Found', 'danger');
          this.loading = false;
          this.btnText = true;
        });
    takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.btnText = true;
          this.cdr.markForCheck();
        });
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) &&
      (control.dirty || control.touched);
    return result;
  }
}
