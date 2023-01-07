import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
emailSubject = 'Your Experience with';
emailHeading = 'Would you be so kind to recommend us?';
emailMessage = 'Hi! Thanks for choosing us. If you have a few minutes, I\'d like to invite you to tell us about your experience. Your feedback is very important to us and it would be awesome if you can share it with us and our potential customers.';
addQuickReview = 'Add Quick Review';
negativeAnswer = 'No, Thanks';
personalAvatar = '';
fullName = 'Name';
businessName = '';
business: any;
companyRole = 'Business Manager';
  negativeHeading = 'We apologize for that.';
  negativeMessage = 'Sorry that your experience was not up to par. Would you mind writing how we could improve?';
  reviewNumberColor = '#D2D2D2';
  reviewStarColor = '#D2D2D2';
  topBackColor = '#00CF00';
  myEmailLogo = 'https://staging-api.heroesofdigital.io/public/images/default-logo.png';
  avatarUrl = 'https://staging-api.heroesofdigital.io/public/images/avatardp.png';
  backgroundImageURL = '';
constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getEmailData();
    this.getBusiness();
  }
  getBusiness(){
    this.business = localStorage.getItem('userData');
    this.business = (JSON.parse(this.business));
    this.businessName = this.business.business_name;
    this.emailSubject = this.emailSubject + ' ' + this.businessName;
  }
  getEmailData(){
    this.userService.getEmailSettings().subscribe(res => {
      if (res.CrmSettings.logo_image_src !== null) {
        this.myEmailLogo = res.CrmSettings.logo_image_src;
      }
      if (res.CrmSettings.background_image_src !== null) {
        this.backgroundImageURL = res.CrmSettings.background_image_src;
      }
      if (res.CrmSettings.email_heading !== null){
        this.emailSubject = res.CrmSettings.email_subject;
        this.emailHeading = res.CrmSettings.email_heading;
        this.emailMessage = res.CrmSettings.email_message;
        this.addQuickReview = res.CrmSettings.positive_answer;
        this.negativeAnswer = res.CrmSettings.negative_answer;
      }
      if (res.CrmSettings.personal_avatar_src !== null){
        this.avatarUrl = res.CrmSettings.personal_avatar_src;
      }
      if (res.CrmSettings.full_name !== null){
        this.fullName = res.CrmSettings.full_name;
      }
      if (res.CrmSettings.company_role !== null){
        this.companyRole = res.CrmSettings.company_role;
      }
      if (res.CrmSettings.email_negative_answer_setup_heading !== null){
        this.negativeHeading = res.CrmSettings.email_negative_answer_setup_heading;
      }
      if (res.CrmSettings.email_negative_answer_setup_message !== null){
        this.negativeMessage = res.CrmSettings.email_negative_answer_setup_message;
      }
      if (res.CrmSettings.review_number_color !== null) {
        this.reviewNumberColor = res.CrmSettings.review_number_color;
      }
      if (res.CrmSettings.star_rating_color !== null) {
        this.reviewStarColor = res.CrmSettings.star_rating_color;
      }
      if (res.CrmSettings.top_background_color !== null) {
        this.topBackColor = res.CrmSettings.top_background_color;
      }
    });
  }
  uploadAvatar(event: any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.avatarUrl = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.files.length > 0) {
      this.avatarUrl = event.target.files[0];
      this.userService.updateAvatar(this.avatarUrl).subscribe(res => {
        this.getEmailData();
      });
    }
  }
  logoEmail(event: any){
  console.log('Hello');
  if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.myEmailLogo = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.files.length > 0) {
      this.myEmailLogo = event.target.files[0];
      this.userService.logoImage(this.myEmailLogo).subscribe(res => {
        this.getEmailData();
      });
    }
  }
  backgroundImage(event: any){
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.backgroundImageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    if (event.target.files.length > 0) {
      this.backgroundImageURL = event.target.files[0];
      this.userService.backgroundImage(this.backgroundImageURL).subscribe(res => {
        this.getEmailData();
      });
    }
  }
  submitMailTemp(){
    const mailData = {
      email_subject: this.emailSubject,
      email_heading: this.emailHeading,
      email_message: this.emailMessage,
      positive_answer: this.addQuickReview,
      negative_answer: this.negativeAnswer,
    };
    // tslint:disable-next-line:max-line-length
    this.userService.mailTemplate(mailData.email_subject, mailData.email_heading, mailData.email_message, mailData.positive_answer, mailData.negative_answer).subscribe(res => {
      this.mailSuccess();
      this.getEmailData();
    });
  }

  personalData(){
    const perData = {
      full_name: this.fullName,
      company_role: this.companyRole,
    };
    // tslint:disable-next-line:max-line-length
    this.userService.personalData(perData.full_name, perData.company_role).subscribe(res => {
      this.mailSuccess();
      this.getEmailData();
    });
  }

  negativeMsgData(){
    const msgData = {
      email_negative_answer_setup_heading: this.negativeHeading,
      email_negative_answer_setup_message: this.negativeMessage,
    };
    // tslint:disable-next-line:max-line-length
    this.userService.negativeData(msgData.email_negative_answer_setup_heading, msgData.email_negative_answer_setup_message).subscribe(res => {
      this.mailSuccess();
      this.getEmailData();
    });
  }

  addColors(){
    const colorData = {
      review_number_color: this.reviewNumberColor,
      star_rating_color: this.reviewStarColor,
      top_background_color: this.topBackColor,
    };
    // tslint:disable-next-line:max-line-length
    this.userService.addColorsData(colorData.review_number_color, colorData.star_rating_color, colorData.top_background_color).subscribe(res => {
      this.mailSuccess();
      this.getEmailData();
    });
  }

  mailSuccess()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Template updated Successfully!',
      icon: 'success',
    }).then((result) => {
      if (result.value) {
      }
    });
  }

}


