import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, first, takeUntil} from 'rxjs/operators';
import {Address, AngularGooglePlaceConstantService} from 'angular-google-place';
import {User} from '../../../core/auth/_models/user';
import {AuthenticationService} from '../../../core/store/_services/authentication.service';
import {$} from 'protractor';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';
import {UserService} from '../../../core/store/_services/user.service';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  baseURL = `${environment.baseUrl}`;
  registerForm: FormGroup;
  loading = false;
  btnText = true;
  businessDiv = true;
  businessBox = false;
  manualBussiness = false;
  manualBox = false;
  hideTitle = true;
  adminSource: any;
  error: any = '';
  public address: any;
  public manualWebsite: any = '';
  public manualPhone: any = '';
  public typesOptions: string[];

  public businessName: string;
  public businessLocation: string;
  public fullAddress: string;
  public businessStatus: string;
  public discoveryStatus: string;
  public nicheId: string;
  public country: string;
  public phone: string;
  public state: string;
  public city: string;
  public zipCode: string;
  public website: string;
  public userAgent: string;
  public avatar: string;
  public logo: string;
  public businessUrl: string;
  public options = {type: 'address'};
// @ts-ignore
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  private unsubscribe: Subject<any>;
  private returnUrl: any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    public authNoticeService: AuthNoticeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    public constant: AngularGooglePlaceConstantService,
    private userService: UserService
  ) {
    this.typesOptions = this.constant.types_options();
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.initRegisterForm();
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || '/dashboard';
    });
    this.PrintParams();
  }
  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results){
      return 0;
    }
    return results[1] || 0;
  }
  PrintParams() {
    this.adminSource =  this.GetParam('source');
    if (this.adminSource === 'admin'){
      this.hideTitle = false;
    }
    else if (this.adminSource === 0){
      this.router.navigate(['/dashboard']);
    }
  }
  /**
   * Form initalization
   * Default params, validators
   */
  initRegisterForm() {
    this.registerForm = this.fb.group({
      manualWebsite: '',
      manualPhone: '',
      business_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      firstname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      lastname: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ]),
      ],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
    });
  }
  getAddress(address: Address) {
    // tslint:disable-next-line:triple-equals
    // tslint:disable-next-line:only-arrow-functions
    this.businessDiv = false;
    this.businessBox = true;
    this.manualBussiness = false;
    this.businessName = address.name;
    this.fullAddress = address.formatted_address;
    this.businessLocation = address.formatted_address;
    this.businessStatus = address.business_status;
    this.discoveryStatus = address.formatted_address;
    this.nicheId = address.place_id;
    this.avatar = address.icon;
    this.logo = address.icon;
    this.phone = address.formatted_phone_number;
    this.website = address.website;
    this.userAgent = null;
    this.city = null;
    this.zipCode = null;
    this.state = null;
    this.country = null;
    this.businessUrl = address.url;
  }
  onManualClick(){
    this.manualBox = true;
    this.manualBussiness = false;
  }
  onCross() {
    this.businessDiv = true;
    this.businessBox = false;
  }

  onChange() {
    this.address = this.registerForm.controls.business_name.value;
    if (this.address !== ''){
      this.manualBussiness = true;
      this.manualBox = false;
    }
  }
  /**
   * Form Submit
   */
  submit() {
    const controls = this.registerForm.controls;
    // check form
    if (this.registerForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.btnText = false;
    const values = this.registerForm;
    const _user: User = new User();
    _user.firstname = controls.firstname.value;
    _user.lastname = controls.lastname.value;
    _user.email = controls.email.value;
    _user.password = controls.password.value;
    _user.password_confirmation = controls.password.value;

    _user.business_name =  this.businessName;
    _user.business_location =  this.businessLocation;
    this.manualWebsite = this.registerForm.controls.manualWebsite.value;
    if (this.manualWebsite !== ''){
      _user.website = this.manualWebsite;
      _user.business_name = controls.business_name.value;
    }else{
      _user.website = this.website;
    }
    this.manualPhone = this.registerForm.controls.manualPhone.value;
    if (this.manualPhone !== ''){
      _user.phone = this.manualPhone;
    }else{
      _user.phone = this.phone;
    }
    _user.address = this.fullAddress;
    _user.business_status =  this.businessStatus;
    _user.discovery_status = this.businessStatus;
    _user.niche_id = this.nicheId;
    _user.country_id = this.country;
    _user.state = this.state;
    _user.city = this.city;
    _user.zip_code = this.zipCode;
    _user.user_agent = this.userAgent;
    _user.logo = this.logo;
    _user.avatar = this.avatar;
    _user.businessUrl = this.businessUrl;

    this.auth
      .signUp(_user)
      .pipe(first())
      .subscribe(
        data => {
          this.authNoticeService.setNotice('Congrats, Account created Successfully!', 'success');
          this.userService.sendRequest().subscribe((rec: any[]) => {
          });
          if (this.adminSource !== 'admin') {
            this.router.navigate([this.returnUrl]);
          }else{
            this.myAlert();
          }
        },
        error => {
          this.error = error;
          if (this.error === 'Bad Request'){
            this.authNoticeService.setNotice('Email is already Taken', 'danger');
          }else if (this.error === 'Unauthorized'){
            this.authNoticeService.setNotice('Account is deactivated', 'danger');
          }
          this.btnText = true;
        });
    takeUntil(this.unsubscribe),
      finalize(() => {
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
    const control = this.registerForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  myAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Account Created Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        window.location.href = this.baseURL + 'admin/dashboard';
      }
    });
  }
}
