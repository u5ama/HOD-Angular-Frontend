import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-appointment-date',
  templateUrl: './appointment-date.component.html',
  styleUrls: ['./appointment-date.component.css']
})
export class AppointmentDateComponent implements OnInit {
  services = [];
  dates = [];
  DateForm: FormGroup;
  constructor(private fb: FormBuilder,  private userService: UserService) { }

  ngOnInit(): void {
    this.getAllServices();
    this.initDateForm();
    this.getAllDates();
  }

  getAllServices(){
    this.userService.getServices().subscribe(res => {
      if (res){
        this.services = res.services;
      }
    });
  }

  getAllDates(){
    this.userService.getDates().subscribe(res => {
      if (res){
        this.dates = res.dates;
      }
    });
  }
  deleteDate(dateId){
    this.userService.deleteDates(dateId).subscribe(res => {
        this.dateDelete();
    });
  }

  initDateForm(){
    this.DateForm = this.fb.group({
      service_id: ['', Validators.compose([
        Validators.required,
      ])
      ],
      appointment_date: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      appointment_time: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(100)
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
  isDateControlHasError(controlName: string, validationType: string): boolean {
    const control = this.DateForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  AddDate(){
    const controls = this.DateForm.controls;
    if (this.DateForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const DateForm = {
      service_id: controls.service_id.value,
      appointment_date: controls.appointment_date.value,
      appointment_time: controls.appointment_time.value,
      type: 'date'
    };

    this.userService.addAppointmentDates(DateForm).subscribe(res => {
      if (res.success === 'true'){
        this.DateAlert();
      }
    });
  }
  DateAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Appointment Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllDates();
        this.DateForm.reset();
      }
    });
  }
  dateDelete()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Appointment Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllDates();
      }
    });
  }
}
