import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, first, takeUntil, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AuthenticationService} from '../../../core/store/_services/authentication.service';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';
import {LoaderService} from '../../../core/store/_services/loader.service';

const DEMO_PARAMS = {
  EMAIL: '',
  PASSWORD: ''
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  btnText = true;
  isLoggedIn$: Observable<boolean>;
  error: any = '';
  private unsubscribe: Subject<any>;

  private returnUrl: any;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public authNoticeService: AuthNoticeService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.initLoginForm();

    // redirect back to the returnUrl before login
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || '/dashboard';
    });
  }

  ngOnDestroy(): void {
    this.authNoticeService.setNotice(null);
    this.loading = false;
    this.btnText = true;
  }

  /**
   * Form initalization
   * Default params, validators
   */
  initLoginForm() {
    this.loginForm = this.fb.group({
      email: [DEMO_PARAMS.EMAIL, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ],
      password: [DEMO_PARAMS.PASSWORD, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ]
    });
  }

  /**
   * Form Submit
   */
  submit() {
    const controls = this.loginForm.controls;
    /** check form */
    if (this.loginForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.btnText = false;

    const authData = {
      email: controls.email.value,
      password: controls.password.value
    };
    this.auth
      .login(authData.email, authData.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data){
          this.authNoticeService.setNotice('Account login Successfully!', 'success');
          this.router.navigate([this.returnUrl]);
         }
        },
        error => {
          this.error = error;
          if (this.error === 'Bad Request'){
            this.authNoticeService.setNotice('Incorrect Email/Password', 'danger');
          }else if (this.error === 'Payment Required'){
            this.authNoticeService.setNotice('Account is deactivated', 'danger');
          }else if (this.error === 'Unauthorized'){
            let msg = '';
            msg += 'Looks like your account trial ends.';
            msg += '<br/>Kindly Contact support for details.';
            this.authNoticeService.setNotice(msg, 'danger');
          }
          this.btnText = true;
        });
    takeUntil(this.unsubscribe),
        finalize(() => {
          this.btnText = true;
          this.cdr.markForCheck();
        });
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.loginForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

}
