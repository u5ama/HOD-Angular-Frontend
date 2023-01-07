import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../../../core/store/_services/authentication.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.css']
})
export class RedirectPageComponent implements OnInit {
  token: any;
  role: any;
  private returnUrl: any;
  constructor( private router: Router, private route: ActivatedRoute, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params.returnUrl || '/dashboard';
    });
    this.redirectCall();
  }
  redirectCall(){
    window.localStorage.clear();
    this.token =  this.GetParam('token');
    this.role =  this.GetParam('role');
    this.auth
      .redirectLogin(this.token, this.role)
      .pipe(first())
      .subscribe(
        data => {
          if (data){
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
        });
  }
  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results){
      return 0;
    }
    return results[1] || 0;
  }
}
