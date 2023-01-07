/*
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap, map, switchMap } from 'rxjs/operators';
import {AuthenticationService} from '../_services/authentication.service';
import {Observable} from 'rxjs';
import {AuthActionTypes, LogInSuccess, LogInFailure, SignUp, LogIn} from '../_actions/auth.actions';
import {User} from '../../auth/_models/user';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthenticationService,
    private router: Router,
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN)
      map((action: LogIn) => action.payload)
      switchMap(payload => {
        return this.authService.login(payload.email, payload.password)
          .map((user) => {
            console.log(user);
            return new LogInSuccess({token: user.token, email: payload.email});
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new LogInFailure({ error: error }));
          });
      })
  );

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  @Effect()
  SignUp: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.SIGNUP)
      map((action: SignUp) => action.payload)
      switchMap(payload => {
        return this.authService.signUp(User)
          .map((user) => {
            console.log(user);
            return new SignUpSuccess({token: user.token, email: payload.email});
          })
          .catch((error) => {
            console.log(error);
            return Observable.of(new SignUpFailure({ error: error }));
          });
      })
  );
}
*/
