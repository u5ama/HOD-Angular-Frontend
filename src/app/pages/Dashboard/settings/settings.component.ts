import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/store/_services/user.service';
import {FormGroup} from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  updateCompanyForm: FormGroup;
  records: '';
  companyName = '';
  companyEmail: '';
  companyPhone: '';
  companyWebsite: '';
  companyLogo: '';
  companyAddress: '';
  companyCity: '';
  companyState: '';
  companyZip: '';
  companyCountry: '';
  url = '';
  changeBtn = false;
  urlBtn = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getCompanyDetail();
  }
  getCompanyDetail(){
    this.userService.getCompanyRecord().subscribe(res => {
      this.url = res.userBusiness.logo;
      this.companyName = res.userBusiness.business_name;
      this.companyEmail = res.userData.email;
      this.companyPhone = res.userBusiness.phone;
      this.companyWebsite = res.userBusiness.website;
      this.companyAddress = res.userBusiness.address;
      this.companyCity = res.userBusiness.city;
      this.companyState = res.userBusiness.state;
      this.companyZip = res.userBusiness.zip_code;
      this.companyCountry = res.userBusiness.country;
      if (this.url !== null){
        this.changeBtn = true;
        this.urlBtn = false;
      }
    });
  }

  readURL(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.files.length > 0) {
      this.companyLogo = event.target.files[0];
      this.userService.updateCompanyImage(this.companyLogo).subscribe(res => {
        this.getCompanyDetail();
      });
    }
  }

  updateForm(){
      // tslint:disable-next-line:max-line-length
        const companyData = {
          phone: this.companyPhone,
          website: this.companyWebsite,
          city: this.companyCity,
          state: this.companyState,
          country: this.companyCountry,
          address: this.companyAddress,
          zip_code: this.companyZip
        };
        // tslint:disable-next-line:max-line-length
        this.userService.updateCompany(companyData.phone, companyData.website, companyData.city, companyData.state, companyData.country, companyData.address, companyData.zip_code).subscribe(res => {
          this.customerSuccess();
          this.getCompanyDetail();
        });
    }

  customerSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Business Updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
}
