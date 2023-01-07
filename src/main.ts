import {enableProdMode, isDevMode} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  /*if (window) {
    window.console.log = () => {};
  }*/
}
/*if (isDevMode()){
  window.console.log = () => {};
}*/
// tslint:disable-next-line:no-unused-expression
/*isDevMode() && console.log('bla bla bla bla');*/
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
