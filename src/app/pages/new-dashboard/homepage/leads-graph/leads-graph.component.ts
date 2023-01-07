import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {MultiDataSet, Label} from 'ng2-charts';
import {UserService} from '../../../../core/store/_services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-leads-graph',
  templateUrl: './leads-graph.component.html',
  styleUrls: ['./leads-graph.component.css']
})
export class LeadsGraphComponent implements OnInit {
  allCalls: any;
  submitCTMForm: FormGroup;
  accounts = [];
  accountId = '';
  accountName = '';
  recordBox = false;
  buttonBox = true;
  phoneLoader = false;
  alertError = false;
  errorContent = '';
  @ViewChild('myNewCTMModel') content: any;
  @ViewChild('myNewCTMModel') openModal: ElementRef;
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false }
  };
  doughnutChartLabels: Label[] = ['Phone'];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: [
        '#FFDA74',
        '#6CD6B3',
        '#9D94EB',
      ]
    }
  ];
  constructor(private userService: UserService, public router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initCusForm();
    this.getCTMDetails();
  }
  getCTMDetails() {
    this.userService.getCTMRecord().subscribe(res => {
      if (res.data !== 'No data found'){
        if (res.data.callData !== ''){
          this.recordBox = true;
          this.buttonBox = false;
          this.phoneLoader = false;
          this.allCalls = res.data.callData.total_entries;
          this.doughnutChartData = [this.allCalls];
        }else{
          this.phoneLoader = false;
          this.buttonBox = true;
        }
      }
    });
  }

  /************* CTM *************/
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

/*  getCTMDetails(){
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
  }*/
  succMsg(){
    Swal.fire({
      title: 'Successful!',
      text: 'Account Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        // this.getCTMDetails();
       // window.location.reload();
        this.getCTMDetails();
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
        // window.location.reload();
        this.openModal.nativeElement.click();
        // this.getCustomers();
      }
    });
  }
}
