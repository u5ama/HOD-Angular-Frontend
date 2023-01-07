import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Herosofdigital';
  currentRoute: any;
  appLoader = true;
  constructor(private  router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
      this.currentRoute = event.url;
    });
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.appLoader = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => { // here
        this.appLoader = false;
      }, 2000);
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => { // here
        this.appLoader = false;
      }, 2000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => { // here
        this.appLoader = false;
      }, 2000);
    }
  }
}
