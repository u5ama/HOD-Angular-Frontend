import { Component, OnInit } from '@angular/core';
import {User} from '../../core/auth/_models/user';
import {NavigationEnd, Router} from '@angular/router';
import {AuthenticationService} from '../../core/store/_services/authentication.service';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent implements OnInit {
  currentUser: User;
  userData: any;
  userName: null;
  currentRoute: any;
  isHomepage: boolean;
  constructor( public router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    // @ts-ignore
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.currentRoute = event.url;
        if (this.currentRoute === '/') {
          this.isHomepage = true;
        } else {
          this.isHomepage = false;
        }
      }
    });
  }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      // @ts-ignore
      this.userName = this.userData.first_name + ' ' + this.userData.last_name;
    }
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
