import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  categories = [];
  services = [];
  serviceForm: FormGroup;
  constructor(private fb: FormBuilder,  private userService: UserService) {
  }

  quantities(): FormArray {
    return this.serviceForm.get('quantities') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      prov_name: '',
      prov_email: '',
      prov_phone: '',
    });
  }
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i: number) {
    this.quantities().removeAt(i);
  }
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllServices();
    this.initServiceForm();
  }

  getAllCategories(){
    this.userService.getCategories().subscribe(res => {
      if (res){
        this.categories = res.categories;
      }
    });
  }
  getAllServices(){
    this.userService.getServices().subscribe(res => {
      if (res){
        this.services = res.services;
      }
    });
  }

  deleteService(serviceId){
    this.userService.deleteService(serviceId).subscribe(res => {
        this.serviceDelete();
    });
  }

  initServiceForm(){
    this.serviceForm = this.fb.group({
      quantities: this.fb.array([]),
      service_name: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      paymentScript: ['', Validators.compose([
        Validators.required,
      ])
      ],
      category_id: ['', Validators.compose([
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
  isServiceControlHasError(controlName: string, validationType: string): boolean {
    const control = this.serviceForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  addService(){
    const controls = this.serviceForm.controls;
    // check form
    if (this.serviceForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    const ServiceForm = {
      service_name: controls.service_name.value,
      payment_script: controls.paymentScript.value,
      category_id: controls.category_id.value,
      provider: controls.quantities.value,
      type: 'service'
    };

    this.userService.addService(ServiceForm).subscribe(res => {
      if (res.success === 'true'){
        this.ServiceAlert();
      }
    });
  }
  ServiceAlert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Service Added Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllServices();
        this.serviceForm.reset();
      }
    });
  }
  serviceDelete()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Service Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
        this.getAllServices();
      }
    });
  }
}
