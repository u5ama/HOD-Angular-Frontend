import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-form-settings',
  templateUrl: './form-settings.component.html',
  styleUrls: ['./form-settings.component.css']
})
export class FormSettingsComponent implements OnInit {
  baseURL = `${environment.baseUrl}`;
  userID = '';
  iURL = '';
  userData: any;
  selectField = '1';
  fieldBox = true;
  btnBox = false;
  headBox = false;

  /*** Field ***/
  fieldWidth = '100';
  fieldHeight = '62';
  fieldFontSize = '16';
  fieldFontColor = '#212529';
  fieldLabelFontColor = '#212529';
  fieldLabelFontSize = '15';
  /*** Field ***/

  /*** Button ***/
  btnBackgroundColor = '#E76461';
  btnBorderColor = '#E76461';
  btnFontSize = '16';
  btnFontColor = '#ffffff';
  btnWidth = '150';
  btnHeight = '62';
  /*** Button ***/

  /*** Heading ***/
  headingColor = '#212529';
  headFontSize = '24';
  headText = 'Appointment Form';
  /*** Heading ***/

  /*** Font ***/
  formFontFamily = 'nunito';
  /*** Font ***/


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.userID = this.userData.id;
    }
    this.iURL = this.baseURL + 'public/js/appForm.js?dv=' + this.userID;
    this.getFormData();
  }
  getFormData(){
    this.userService.getCustomAppointmentsFormData().subscribe(res => {
      if (res.form !== null){
        this.fieldWidth = res.form.width;
        this.fieldHeight = res.form.height;
        this.fieldFontSize = res.form.fontSize;
        this.fieldFontColor = res.form.fontColor;
        this.fieldLabelFontColor = res.form.labelColor;
        this.fieldLabelFontSize = res.form.labelFontSize;
      }
      if (res.button !== null){
        this.btnBackgroundColor = res.button.backgroundColor;
        this.btnBorderColor = res.button.borderColor;
        this.btnFontSize = res.button.fontSize;
        this.btnFontColor = res.button.fontColor;
        this.btnWidth = res.button.btnWidth;
        this.btnHeight = res.button.btnHeight;
      }
      if (res.head !== null){
        this.headingColor = res.head.headColor;
        this.headFontSize = res.head.headFontSize;
        this.headText = res.head.headingText;
      }
      if (res.font !== null){
        this.formFontFamily = res.font.allFontFamily;
      }
    });
  }
  saveFont() {
    const fontStyle = {
      type: 'font',
      formFontFamily: this.formFontFamily,
    };
    this.userService.submitAppointmentsCustomForm(fontStyle).subscribe(res => {
      this.getFormData();
    });
  }
  changeFields(){
    if (this.selectField === '1'){
      this.fieldBox = true;
      this.btnBox = false;
      this.headBox = false;
    }else if (this.selectField === '2'){
      this.fieldBox = false;
      this.btnBox = true;
      this.headBox = false;
    }else if (this.selectField === '3'){
      this.fieldBox = false;
      this.btnBox = false;
      this.headBox = true;
    }
  }
  saveForm(){
    const formRec = {
      type: 'form',
      fieldWidth: this.fieldWidth,
      fieldHeight: this.fieldHeight,
      fieldFontSize: this.fieldFontSize,
      fieldFontColor: this.fieldFontColor,
      fieldLabelFontColor: this.fieldLabelFontColor,
      fieldLabelFontSize: this.fieldLabelFontSize
    };
    this.userService.submitAppointmentsCustomForm(formRec).subscribe(res => {
      this.formFields();
      this.getFormData();
    });
  }
  saveButton(){
    const btnRec = {
      type: 'button',
      btnWidth: this.btnWidth,
      btnHeight: this.btnHeight,
      btnFontSize: this.btnFontSize,
      btnFontColor: this.btnFontColor,
      btnBorderColor: this.btnBorderColor,
      btnBackgroundColor: this.btnBackgroundColor
    };
    this.userService.submitAppointmentsCustomForm(btnRec).subscribe(res => {
      this.formButton();
      this.getFormData();
    });
  }
  saveHead(){
    const headTag = {
      type: 'head',
      headColor: this.headingColor,
      headFontSize: this.headFontSize,
      headText: this.headText,
    };
    this.userService.submitAppointmentsCustomForm(headTag).subscribe(res => {
      this.formHead();
      this.getFormData();
    });
  }
  formFields()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Form Fields Updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
  formButton()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Form Button Updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }

  formHead()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Form Heading Updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
}
