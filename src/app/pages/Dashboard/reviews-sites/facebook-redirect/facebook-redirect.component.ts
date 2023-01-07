import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook-redirect',
  templateUrl: './facebook-redirect.component.html',
  styleUrls: ['./facebook-redirect.component.css']
})
export class FacebookRedirectComponent implements OnInit {
  fbURL: any;
  constructor() { }

  ngOnInit() {
    this.fbURL = localStorage.getItem('fbUrl');
    this.fbURL = (JSON.parse(this.fbURL));
    window.location.href = this.fbURL;
  }

}
