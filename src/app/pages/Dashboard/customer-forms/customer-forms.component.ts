import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {environment} from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-forms',
  templateUrl: './customer-forms.component.html',
  styleUrls: ['./customer-forms.component.css']
})
export class CustomerFormsComponent implements OnInit {
  selectField = '1';
  fieldBox = true;
  btnBox = false;
  headBox = false;
  customBox = false;
  baseURL = `${environment.baseUrl}`;
  userID = '';
  iURL = '';
  userData: any;
  /*** Field ***/
  fieldWidth = '100';
  fieldHeight = '62';
  fieldFontSize = '16';
  fieldFontColor = '#999';
  fieldLabelFontColor = '#999';
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
  headingColor = '#999';
  headFontSize = '30';
  headText = 'Customer Form';
  /*** Heading ***/

  /*** Font ***/
  formFontFamily = 'nunito';
  /*** Font ***/

  /*** Field ***/
  fieldType = 'text';
  fieldName = '';
  fieldPlaceholder = '';
  fieldLabel = '';
  lastName = true;
  commentBox = true;
  fieldsData = [];
  /*** Font ***/
  constructor(private userService: UserService) { }

  ngOnInit(): void {
   this.getFormData();
   this.userData = localStorage.getItem('userData');
   this.userData = JSON.parse(this.userData);
   if (this.userData !== null){
      this.userID = this.userData.id;
    }
   this.iURL = this.baseURL + 'form?myid=' + this.userID;
   this.getDeletedFields();
   this.getAddedFields();
  }

  changeFields(){
    if (this.selectField === '1'){
      this.fieldBox = true;
      this.btnBox = false;
      this.headBox = false;
      this.customBox = false;
    }else if (this.selectField === '2'){
      this.fieldBox = false;
      this.btnBox = true;
      this.headBox = false;
      this.customBox = false;
    }else if (this.selectField === '3'){
      this.fieldBox = false;
      this.btnBox = false;
      this.headBox = true;
      this.customBox = false;
    }else if (this.selectField === '4'){
      this.fieldBox = false;
      this.btnBox = false;
      this.headBox = false;
      this.customBox = true;
    }
  }
  getFormData(){
    this.userService.getCustomFormData().subscribe(res => {
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
      }else{
        this.saveFont();
      }
    });
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
    this.userService.submitCustomForm(formRec).subscribe(res => {
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
    this.userService.submitCustomForm(btnRec).subscribe(res => {
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
    this.userService.submitCustomForm(headTag).subscribe(res => {
      this.formHead();
      this.getFormData();
    });
  }
  saveFont(){
    const fontStyle = {
      type: 'font',
      formFontFamily: this.formFontFamily,
    };
    this.userService.submitCustomForm(fontStyle).subscribe(res => {
      this.getFormData();
    });
  }
  deleteField(id, value){
    if (value === 'lastname'){
      this.lastName = false;
    }
    if (value === 'comment'){
      this.commentBox = false;
    }
    const field = {
      field_id: id,
      field_name: value,
    };
    this.userService.deleteField(field).subscribe(res => {
      this.formDelete();
    });
  }
  deleteCustomField(id){
    const field = {
      field_id: id,
    };
    this.userService.deleteCustomField(field).subscribe(res => {
      this.formDelete();
    });
  }

  getDeletedFields(){
    this.userService.getDeleteField().subscribe(res => {
      if (res){
        let i;
        for (i = 0; i < res.length; i++){
          if (res[i].field_name === 'lastname'){
            this.lastName = false;
          }
          if (res[i].field_name === 'comment'){
            this.commentBox = false;
          }
        }
      }
    });
  }
  addField(){
    const field = {
      field_type: this.fieldType,
      field_name: this.fieldName,
      field_placeholder: this.fieldPlaceholder,
      label: this.fieldLabel,
    };
    this.userService.addFields(field).subscribe(res => {
      console.log(res);
      this.getAddedFields();
    });
  }

  getAddedFields(){
    this.userService.getAddedField().subscribe(res => {
      console.log(res);
      this.fieldsData = res;
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

  formDelete()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Form Field Deleted Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
}
