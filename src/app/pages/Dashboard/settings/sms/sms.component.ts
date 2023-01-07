import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {
requestImage = 'https://staging-api.heroesofdigital.io/public/images/avatardp.png';
smsImage = '';
smsMessage =  'Thank you for recommending us to family and friends. Would you mind writing a short review?';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getSmsSettings();
  }
  getSmsSettings(){
    this.userService.getSmsRecords().subscribe(res => {
      if (res.CrmSettings.sms_image !== null){
        this.requestImage = res.CrmSettings.sms_image;
      }
      if (res.CrmSettings.sms_message !== null){
        this.smsMessage = res.CrmSettings.sms_message;
      }
    });
  }
  uploadSMSImage(event: any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.requestImage = event.target.result
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.files.length > 0) {
      this.smsImage = event.target.files[0];
    }
  }
  saveMessage(){
    const smsMessage = this.smsMessage;
    this.userService.saveSmsMessage(smsMessage).subscribe(res => {
      this.saveSuccess();
      this.getSmsSettings();
    });
  }
  saveImage(){
    this.userService.smsImage(this.smsImage).subscribe(res => {
      this.getSmsSettings();
    });
  }
  saveSuccess(){
    Swal.fire({
      title: 'Successful!',
      text: 'Message saved Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }
}
