import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-redirect',
  templateUrl: './google-redirect.component.html',
  styleUrls: ['./google-redirect.component.css']
})
export class GoogleRedirectComponent implements OnInit {
  googleURL: any;
  constructor() { }

  ngOnInit(): void {
    this.googleURL = localStorage.getItem('googleURL');
    this.googleURL = (JSON.parse(this.googleURL));
    window.location.href = this.googleURL.url;
  }

}
