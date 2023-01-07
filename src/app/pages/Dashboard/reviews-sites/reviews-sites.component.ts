import {ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {finalize, first, takeUntil} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/store/_services/user.service';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from '@angular/router';
import {Address, AngularGooglePlaceConstantService} from 'angular-google-place';

@Component({
  selector: 'app-reviews-sites',
  templateUrl: './reviews-sites.component.html',
  styleUrls: ['./reviews-sites.component.css']
})
export class ReviewsSitesComponent implements OnInit {
  linkGoogleForm: FormGroup;
  private unsubscribe: Subject<any>;
  error: '';
  connData: any;
  connectedGoogle = false;

  connectedGoogleAnalytics = false;
  notDetectedGoogleAnalytics = false;

  connectedFacebook = false;
  notConnectedFacebook = true;

  connectedFacebookAds = false;
  notConnectedFacebookAds = true;

  notConnected = true;
  notConnectedAnalytics = true;

  loading = false;
  btnText = true;
  address: any;
  accountName = '';
  accessToken: any;
  accessRepToken: any;
  public options = {type: 'address'};
  public typesOptions: string[];
// @ts-ignore
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  googleBusinessName = 'Not Listed';
  facebookBusinessName = 'Not Listed';

  /*CTM*/
  submitCTMForm: FormGroup;
  accountId = '';
  accountIdCtm = '';
  accountNameCtm = '';
  allCalls = '0';
  recordBox = false;
  buttonBox = true;
  phoneLoader = false;
  alertError = false;
  errorContent = '';

  connectedCTM = false;
  notConnectedCTM = true;

  showLoader = false;

  userId = '';
  businessId = '';
  userData: any;
  pages = [];
  accounts = [];

  notConnectedAds = true;
  connectedGoogleAds = false;


  @ViewChild('myNewModel') content: any;
  @ViewChild('myNewModel') openModal: ElementRef;

  @ViewChild('myNewCTMModel') contentt: any;
  @ViewChild('myNewCTMModel') openCTMModal: ElementRef;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    public router: Router,
    public constant: AngularGooglePlaceConstantService,
  ) {
    this.typesOptions = this.constant.types_options();
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.userId = this.userData.id;
      this.businessId = this.userData.business_id;
    }

    this.initRegistrationForm();
    this.getConnectionsData();
    this.googleConnect();
    this.getGoogleAnalytics();

    this.getGoogleAdsData();

    this.initCusForm();
    this.getCTMDetails();

    this.PrintParams();
    this.getPageData();

    if (this.accessToken !== 0){
      this.getPagDetail();
    }
    if (this.accessRepToken !== 0){
      this.getAdsReports();
    }
  }
  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results){
      return 0;
    }
    return results[1] || 0;
  }
  PrintParams() {
    this.accessToken =  this.GetParam('accessToken');
    this.accessRepToken =  this.GetParam('accessRepToken');
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
    this.btnText = true;
  }

  /*Facebook*/
  getPageData(){
    this.userService.getFacebookConData().subscribe(res => {

        if (res){
          this.facebookBusinessName = res.records.name;
        }
        if (res.records.is_manual_connected === 1){
          this.connectedFacebook = true;
          this.notConnectedFacebook = false;
        }else{
          this.connectedFacebook = false;
          this.notConnectedFacebook = true;
        }
    });
  }
  getPagDetail(){
    this.showLoader = true;
    this.userService.PageDetails(this.accessToken).subscribe(res => {
      this.pages = res.records.data;
      this.showLoader = false;
      if (res){
        this.openModel();
      }
    });
  }
  openModel(){
   this.openModal.nativeElement.click();
  }
  selectPage(token, id){
    this.userService.selectPage(this.accessToken, id, this.businessId).subscribe(res => {
      this.opensFbSweetAlert();
    });
  }
  opensFbSweetAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Facebook Connected Successfully!',
      icon: 'success',
    }).then((result) => {
      this.router.navigateByUrl('/connections');
      this.getPageData();
    });
  }
  getAdsReports(){
    this.showLoader = true;
    this.userService.FbAdsReports(this.accessRepToken).subscribe(res => {
      this.showLoader = false;
      console.log(res);
    });
  }
  /*Facebook*/

  googleConnect(){
    this.connData = localStorage.getItem('connData');
    this.connData = (JSON.parse(this.connData));
    if (this.connData !== null){
      if (this.connData.is_manual_deleted !== 1){
        this.connectedGoogle = true;
        this.notConnected = false;
        this.googleBusinessName =  this.connData.name;
      }
    }
  }

  getConnectionsData(){
    this.userService.getConnectionsData()
      .subscribe(
        data => {
          this.googleConnect();
        },
        error => {
          this.error = error;
        });
  }
  initRegistrationForm() {
    this.linkGoogleForm = this.fb.group({
      link: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ]
    });
  }
  /*Google Analytics*/
  getGoogleAnalytics(){
    this.userService.getGoogleData().subscribe(res => {
      if (res.webData !== null){
          if (res.webData.google_analytics === 0){
            this.notConnectedAnalytics = false;
            this.notDetectedGoogleAnalytics = true;
            this.connectedGoogleAnalytics = false;
          }else{
            if (res.webData.ga_connected !== 1){
              this.notConnectedAnalytics = true;
              this.connectedGoogleAnalytics = false;
            }
            else if (res.webData.google_analytics_deleted === 1){
              this.connectedGoogleAnalytics = false;
              this.notConnectedAnalytics = true;
            }else {
              this.connectedGoogleAnalytics = true;
              this.notConnectedAnalytics = false;
            }
          }
        }
    });
  }
  deleteGoogleAnalyticsConnection(conType){
    this.userService.deleteGoogleConnection(conType, this.businessId)
      .subscribe(
        data => {
          if (data !== ''){
            this.deleteSuccessAlert();
          }
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }
  openGoogle(){
    this.userService.openGoogleAnalytics().subscribe(res => {
      this.router.navigateByUrl('/google_redirect');
    });
  }
  /*Google Analytics*/

  opensweetalert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Google Connected Successfully!',
      icon: 'success',
    }).then((result) => {
    window.location.reload();
    });
  }

  deleteSuccessAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'App Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
    window.location.reload();
    });
  }

  deleteConnection(type){
    this.userService.deleteConnection(type)
      .subscribe(
        data => {
          if (data !== ''){
            this.deleteSuccessAlert();
          }
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }

  connectFacebook(){
    this.userService.connectionFacebook()
      .subscribe(
        data => {
          this.router.navigateByUrl('/facebook_redirect');
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }
  connectFacebookAds(){
    this.userService.connectionFacebookAds()
      .subscribe(
        data => {
          this.router.navigateByUrl('/facebook_redirect');
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }

  submit() {
    const controls = this.linkGoogleForm.controls;
    /** check form */
    if (this.linkGoogleForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.loading = true;
    this.btnText = false;
    const link = controls.link.value;
    this.userService.submitLink(link)
      .subscribe(
        data => {
          if (data !== ''){
            this.opensweetalert();
            this.getConnectionsData();
          }
        },
        error => {
          this.error = error;
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
    const control = this.linkGoogleForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result =
      control.hasError(validationType) &&
      (control.dirty || control.touched);
    return result;
  }

  getAddress(address: Address) {
    this.address = address.url;
    this.linkGoogleForm.controls.link.patchValue(this.address);
  }



  /*CTM*/
  deleteCTMConnection(){
    this.userService.deleteCTM(this.userId)
      .subscribe(
        data => {
          if (data !== ''){
            this.deleteSuccessAlert();
          }
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }
  initCusForm() {
    this.submitCTMForm = this.fb.group({
      userEmail: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ],
      userPassword: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ]
    });
  }
  submitForm(){
    const controls = this.submitCTMForm.controls;
    /** check form */
    if (this.submitCTMForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const authData = {
      user: controls.userEmail.value,
      password: controls.userPassword.value
    };
    this.userService.submitCTM(authData).subscribe(res => {
      if (res._metadata.outcomeCode === 200){
        // console.log(' ia m here');
        if (res.records !== ''){
          // console.log(' ia m here 2');
          this.accounts = res.records.accounts;
          this.openCtmModel();
        }else{
          this.notFoundAlert();
        }
      }else if (res._metadata.message === 'Invalid Parameters') {
        this.alertError = true;
        this.errorContent = 'Incorrect Email/Password';
      }
    });
  }
  isControlHasNewError(controlName: string, validationType: string): boolean {
    const control = this.submitCTMForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getCTMDetails(){
    this.phoneLoader = true;
    this.userService.getCTMRecord().subscribe(res => {
      if (res.data !== 'No data found'){
        this.accountName = res.data.account_name;
        if (res.data.callData !== ''){
          this.connectedCTM = true;
          this.notConnectedCTM = false;
        }
      }else{
        this.connectedCTM = false;
        this.notConnectedCTM = true;
      }
    });
  }

  openCtmModel(){
    this.openCTMModal.nativeElement.click();
  }

  getAccount(accountId, accountName){
    this.accountIdCtm = accountId;
    this.accountNameCtm = accountName;
    this.userService.getAccountConnected(this.accountIdCtm, this.accountNameCtm).subscribe(res => {
      if (res){
        this.succMsg();
      }
    });
  }

  succMsg(){
    Swal.fire({
      title: 'Successful!',
      text: 'Account Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        window.location.reload();
      }
    });
  }
  notFoundAlert()
  {
    Swal.fire({
      title: '',
      text: 'No Account found on CTM.',
      icon: 'warning',
    }).then((result) => {
      if (result.value){
        this.openModal.nativeElement.click();
        // this.getCustomers();
      }
    });
  }
  /************* Google Ads *************/
  openGoogleAds(){
    this.userService.openGoogleAds().subscribe(res => {
      this.router.navigateByUrl('/google_redirect');
    });
  }
  deleteGoogleAdwordsConnection(conType){
    this.userService.deleteGoogleConnection(conType, this.businessId)
      .subscribe(
        data => {
          if (data !== ''){
            this.deleteSuccessAlert();
          }
        },
        error => {
          this.error = error;
          this.loading = false;
          this.btnText = true;
        });
  }

  getGoogleAdsData(){
    this.userService.getGoogleData().subscribe(res => {
      if (res.webData !== null){
        if (res.webData.google_analytics === 0){
          // console.log('i am here');
          this.notConnectedAds = false;
          this.notDetectedGoogleAnalytics = true;
          this.connectedGoogleAds = false;
        }else{
          if (res.webData.gad_connected !== 1){
            this.notConnectedAds = true;
            this.connectedGoogleAds = false;
          }
          else if (res.webData.google_adwords_deleted === 1){
            // console.log('i am here 2');
            this.connectedGoogleAds = false;
            this.notConnectedAds = true;
          }else {
            this.connectedGoogleAds = true;
            this.notConnectedAds = false;
          }
        }
      }
  });
  }
  /************* Google Ads *************/
}
