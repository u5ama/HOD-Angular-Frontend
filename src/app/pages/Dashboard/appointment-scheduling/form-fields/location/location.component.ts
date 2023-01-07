import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locationForm: FormGroup;
  locations = [];
  constructor(private fb: FormBuilder,  private userService: UserService) { }

  ngOnInit(): void {
    this.initLocationForm();
    this.getAllLocations();
  }

  initLocationForm() {
    this.locationForm = this.fb.group({
      country: '',
      location_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      state: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
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
  isLocationControlHasError(controlName: string, validationType: string): boolean {
    const control = this.locationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  getAllLocations(){
    this.userService.getLocations().subscribe(res => {
      if (res){
        this.locations = res.locations;
      }
    });
  }

  deleteLocation(locationId){
    this.userService.deleteLocation(locationId).subscribe(res => {
        this.locationDelete();
    });
  }

  saveLocation(){
    const controls = this.locationForm.controls;
    // check form
    if (this.locationForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    const locationForm = {
      location_name: controls.location_name.value,
      location_state: controls.state.value,
      location_country: controls.country.value,
      type: 'location'
    };

    this.userService.addLocation(locationForm).subscribe(res => {
      if (res.success === 'true'){
        this.locationAlert();
      }
    });
  }
  locationAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Location Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllLocations();
        this.locationForm.reset();
      }
    });
  }

  locationDelete()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Location Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllLocations();
      }
    });
  }
}
