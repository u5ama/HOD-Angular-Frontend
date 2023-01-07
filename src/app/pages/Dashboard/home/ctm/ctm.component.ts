import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-ctm',
  templateUrl: './ctm.component.html',
  styleUrls: ['./ctm.component.css']
})
export class CtmComponent implements OnInit {
  submitCTMForm: FormGroup;
  accounts = [];
  accountId = '';
  accountName = '';
  allCalls = '0';
  recordBox = false;
  buttonBox = true;
  phoneLoader = false;
  alertError = false;
  errorContent = '';
  @ViewChild('myNewCTMModel') content: any;
  @ViewChild('myNewCTMModel') openModal: ElementRef;
  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initCusForm();
    this.getCTMDetails();
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
        if (res.records !== ''){
          this.accounts = res.records.accounts;
          this.openModel();
        }else{
          this.notFoundAlert();
        }
      }else if (res._metadata.message === 'Invalid Parameters') {
          this.alertError = true;
          this.errorContent = 'Incorrect Email/Password';
      }
    });
  }

  openModel(){
    this.openModal.nativeElement.click();
  }

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.submitCTMForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getAccount(accountId, accountName){
    this.accountId = accountId;
    this.accountName = accountName;
    this.userService.getAccountConnected(this.accountId, this.accountName).subscribe(res => {
     if (res){
       this.succMsg();
     }
    });
  }

  getCTMDetails(){
    this.phoneLoader = true;
    this.userService.getCTMRecord().subscribe(res => {
      if (res.data !== 'No data found'){
        if (res.data.callData !== ''){
          this.recordBox = true;
          this.buttonBox = false;
          this.allCalls = res.data.callData.total_entries;
          this.phoneLoader = false;
        }
      }else{
        this.phoneLoader = false;
        this.buttonBox = true;
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
      }
    });
  }
}
