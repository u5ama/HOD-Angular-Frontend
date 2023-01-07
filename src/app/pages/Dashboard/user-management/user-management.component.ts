import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../../core/store/_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';

class Customers {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  enquiries: string;
  enquiry_source: string;
  revenue: string;
  comments: string;
  created_at: string;
}

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  baseURL = `${environment.apiUrl}`;
  userID = '';
  iURL = '';
  searchTable = '';
  totalCustomers: number;
  public accessToken: any;
  dtOptions: DataTables.Settings = {};
  customers: Customers[];
  contactForm: FormGroup;
  contactFormMulti: FormGroup;
  updateContactForm: FormGroup;
  sendingOption = '1';
  sendReminder = 'Yes';
  smartRouting = 'Enable';
  customerId: '';
  verificationCode: '';
  getReviews = 'Yes';
  customEmail = '';
  mailText = '';
  showModalBox2 = false;
  showModalBox1 = false;
  showModalBox3 = false;
  showModalBox4 = false;
  showModalBox5 = false;
  showModalBox6 = false;
  loading = false;
  btnText = true;
  loading1 = false;
  btnText1 = true;
  loading3 = false;
  btnText3 = true;
  businessName: null;
  userData: any;
  fileToUpload: File = null;
  firstId: '';
  flag: '';
  cusId: '';
  cCode = '';
  country = '';
  countries = '';
  selectOption = '1';
  customerMailId = '';
  reviewSiteBox = false;
  reviewSite = '';
  @ViewChild('myModal5') content: any;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpClient, private userService: UserService, private fb: FormBuilder, public authNoticeService: AuthNoticeService) {
  }

  ngOnInit(): void {
    this.initCusForm();
    this.initCusForm2();
    this.initUpdateForm();
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.businessName = this.userData.business_name;
      this.userID = this.userData.id;
    }
    this.iURL = this.baseURL + 'form?myid=' + this.userID;
    this.getCustomers();
    this.getCountries();
  }
  getCountries(){
    this.userService.getAllCountries().subscribe(res => {
      this.countries = res;
      // console.log(this.countries);
      // this.customerId = res.records.customer_id;
      // this.verificationCode = res.records.verification_code;
    });
  }
   getCustomers(){
    const that = this;
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    this.dtOptions = {
      pagingType: 'simple',
      serverSide: true,
      processing: false,
      ordering: true,
      order: [0, 'desc'],
      searching: false,
      lengthChange: false,
      responsive: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<DataTablesResponse>(
            this.baseURL + 'crm-customers-list?token=' + that.accessToken,
            dataTablesParameters, {}
          ).subscribe(resp => {
          // console.log(resp.data);
          // @ts-ignore
          that.customers = resp.data.data;
          // @ts-ignore
          that.totalCustomers = resp.data.recordsTotal;
          callback({
            draw: resp.draw,
            // @ts-ignore
            recordsTotal: resp.data.recordsTotal,
            // @ts-ignore
            recordsFiltered: resp.data.recordsFiltered,
            data: resp.data
          });
        });
      },
      columns: [{ data: 'first_name' }, { data: 'last_name' }, { data: 'phone_number' }, { data: 'email' }, { data: 'enquiries' }, { data: 'enquiry_source' }, { data: 'revenue' }, { data: 'comments' }, { data: 'created_at' }]
    };
  }

  initCusForm2() {
    this.contactFormMulti = this.fb.group({
      csvFile: ['', Validators.compose([
        Validators.required
      ])
      ],
      fileSource: ['', Validators.compose([
        Validators.required
      ])
      ],
      agree: [false, Validators.compose([Validators.required])]
    });
  }

  initCusForm() {
    this.contactForm = this.fb.group({
      first_name: '',
      last_name: '',
      country: '',
      cusStatus: '',
      country_code: '',
      cusRevenue: '',
      cusComment: '',
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ],
      phone_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ]
    });
  }
  initUpdateForm() {
    this.updateContactForm = this.fb.group({
      first_name: '',
      last_name: '',
      cusStatus: '',
      cusRevenue: '',
      cusComment: '',
      cusEmail: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320)
      ])
      ],
      cus_phone_number: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ]
    });
  }
  submitContact(){
    const controls = this.contactForm.controls;
    if (this.contactForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.showModalBox2 = false;
      return;
    }
    this.showModalBox2 = true;
    this.showModalBox1 = false;
    const usersData = {
       firstName: controls.first_name.value,
       lastName: controls.last_name.value,
       email: controls.email.value,
       phoneNumber: controls.phone_number.value,
       country: controls.country.value,
       countryCode: controls.country_code.value,
       status: controls.cusStatus.value,
       cusRevenue: controls.cusRevenue.value,
       cusComment: controls.cusComment.value,

    };
    this.userService.addContact(usersData).subscribe(res => {
      this.customerId = res.records.customer_id;
      this.verificationCode = res.records.verification_code;
    });
  }
  atChange(){
    if (this.smartRouting === 'Disable'){
        this.reviewSiteBox = true;
    }
  }
  submitContactAgain(){
    const controls = this.contactForm.controls;
    this.btnText = false;
    this.loading = true;
    if (this.customEmail !== ''){
      this.mailText = this.customEmail;
    }else{
      this.mailText = 'Hi there!\n' +
        'Thanks for choosing us. If you have a few minutes, I\'d like to invite you to tell us about your experience. Your feedback is very important to us and it would be awesome if you can share it with us and our potential customers';
    }
    const usersData = {
       firstName: controls.first_name.value,
       lastName: controls.last_name.value,
       email: controls.email.value,
       phoneNumber: controls.phone_number.value,
       country: controls.country.value,
       countryCode: controls.country_code.value,
       status: controls.cusStatus.value,
       customer_id: this.customerId,
        smart_routing: this.smartRouting,
        enable_get_reviews: this.getReviews,
        sending_option: this.sendingOption,
        verification_code: this.verificationCode,
        review_site: this.reviewSite,
        reminder: this.sendReminder,
        customize_email: this.mailText
    };
    this.userService.addContact(usersData).subscribe(res => {
      if (res.records.customer_id !== ''){
        this.loading = false;
        this.btnText = true;
        this.customerSuccess();
      }
    });
  }
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.contactForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  updateContact(){
    const controls = this.updateContactForm.controls;
    this.loading3 = true;
    this.btnText3 = false;
    if (this.updateContactForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.showModalBox6 = true;
      return;
    }
    this.showModalBox6 = true;
    const usersData = {
      firstName: controls.first_name.value,
      lastName: controls.last_name.value,
      email: controls.cusEmail.value,
      phoneNumber: controls.cus_phone_number.value,
      status: controls.cusStatus.value,
      cusRevenue: controls.cusRevenue.value,
      cusComment: controls.cusComment.value,
      id: this.cusId,
    };
    this.userService.updateContact(usersData).subscribe(res => {
      if (res.errors.length > 0){
        this.loading3 = false;
        this.btnText3 = true;
        const errors = res.errors;
        const that = this;
        // tslint:disable-next-line:only-arrow-functions
        errors.forEach(function(error) {
          if (error.map === 'email'){
            that.authNoticeService.setNotice(error.message, 'danger');
          }
          if (error.map === 'phone_number'){
            that.authNoticeService.setNotice(error.message, 'danger');
          }
        });
      }else{
        this.loading3 = false;
        this.btnText3 = true;
        this.customerUptSuccess();
      }
    });
  }
  isControlHasMyError(controlName: string, validationType: string): boolean {
    const control = this.updateContactForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
  deleteCus(CusId){
    this.userService.deleteCustomer(CusId).subscribe(res => {
      if (res._metadata.outcome === 'SUCCESS'){
        this.getCustomers();
        this.opensweetalert();
      }
    });
  }
  deleteAlert(cusID)
  {
    Swal.fire({
         title: '',
         text: 'Are you sure you want to delete this customer?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#ff6666',
         confirmButtonText: 'Yes, delete!'
       }).then((result) => {
      if (result.value) {
        this.deleteCus(cusID);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        /*Swal.fire(
          'Cancelled',
          'Customer not deleted!',
          'error'
        );*/
      }
      });
  }
  opensweetalert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Customer Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value){
        this.getCustomers();
        window.location.reload();
      }
    });
  }

  customerSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Customer Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getCustomers();
        window.location.reload();
      }
    });
  }

  customerUptSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Customer Updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getCustomers();
        window.location.reload();
      }
    });
  }
  get f(){
    return this.contactFormMulti.controls;
  }
  handleFileInput(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.contactFormMulti.patchValue({
        fileSource: file
      });
    }
  }
  uploadFileToActivity() {
    const controls = this.contactFormMulti.controls;
    if (this.contactFormMulti.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      this.showModalBox4 = true;
      return;
    }
    this.showModalBox5 = true;
    this.showModalBox4 = false;
    this.fileToUpload = this.contactFormMulti.get('fileSource').value;
    this.userService.uploadCSV(this.fileToUpload).subscribe(res => {
      if (res.records !== ''){
        this.firstId = res.records.first_id;
        this.flag = res.records.flag;
      }
    }, error => {
      console.log(error);
    });
  }
  isControlHasFileError(controlName: string, validationType: string): boolean {
    const control = this.contactFormMulti.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  addCustomerService(){
    this.btnText1 = false;
    this.loading1 = true;
    if (this.customEmail !== ''){
      this.mailText = this.customEmail;
    }else{
      this.mailText = 'Hi there!\n' +
        'Thanks for choosing us. If you have a few minutes, I\'d like to invite you to tell us about your experience. Your feedback is very important to us and it would be awesome if you can share it with us and our potential customers';
    }
    const userData = {
      first_id: this.firstId,
      flag: this.flag,
      smart_routing: this.smartRouting,
      enable_get_reviews: this.getReviews,
      sending_option: this.sendingOption,
      verification_code: this.verificationCode,
      review_site: '',
      reminder: this.sendReminder,
      customize_email: this.mailText
    };
    this.userService.customerService(userData).subscribe(res => {
      if (res.records.customer_id !== ''){
        this.loading1 = false;
        this.btnText1 = true;
        this.customerSuccess();
      }
    });
  }

  emailBox(sample){
    this.customerMailId = sample;
  }
  sendEmail(){
    this.userService.sendInstantMail(this.customerMailId, this.selectOption).subscribe(res => {
     // console.log(res);
      this.emailSuccess();
    });
  }

  emailSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Review Request Sent Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getCustomers();
        window.location.reload();
      }
    });
  }
  addCus(){
    this.showModalBox1 = true;
  }
  addMulti(){
    this.showModalBox3 = true;
  }
  addMultiCSV(){
    this.showModalBox4 = true;
  }
  updateModel(cusId){
    this.cusId = cusId;
    this.showModalBox6 = true;
    this.patchFormValues();
  }
  patchFormValues(){
    this.userService.getCusData(this.cusId).subscribe(res => {
       if (res.records !== ''){
         this.updateContactForm.controls.first_name.patchValue(res.records.first_name);
         this.updateContactForm.controls.last_name.patchValue(res.records.last_name);
         this.updateContactForm.controls.cusEmail.patchValue(res.records.email);
         this.updateContactForm.controls.cus_phone_number.patchValue(res.records.phone_number);
         this.updateContactForm.controls.cusStatus.patchValue(res.records.enquiries);
         this.updateContactForm.controls.cusRevenue.patchValue(res.records.revenue);
         this.updateContactForm.controls.cusComment.patchValue(res.records.comments);
       }
    });
  }
  changeCountry(){
    this.cCode = this.contactForm.controls.country.value;
    // console.log(this.cCode);
    // console.log(this.country);
    this.contactForm.controls.country_code.patchValue(this.cCode);
  }
  onSearch(){
    this.userService.searchCustomer(this.searchTable).subscribe(res => {
      if (res.records.length > 0){
        this.customers = res.records;
      }
    });
  }
}
