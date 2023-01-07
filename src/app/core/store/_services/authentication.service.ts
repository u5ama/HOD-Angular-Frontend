import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../auth/_models/user';
import {environment} from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  headers;

  constructor(private http: HttpClient) {
    // this.headers = new HttpHeaders();
    // this.headers.append('Access-Control-Allow-Headers');
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}login`, { email, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('userData', JSON.stringify(user.userData));
        localStorage.setItem('currentUser', JSON.stringify(user.token));
        this.currentUserSubject.next(user.token);
        return user.token;
      }));
  }
  redirectLogin(userToken, adminRole) {
    return this.http.post<any>(`${environment.apiUrl}login`, {token: userToken, role: adminRole})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('userData', JSON.stringify(user.userData));
        localStorage.setItem('currentUser', JSON.stringify(user.token));
        this.currentUserSubject.next(user.token);
        return user.token;
      }));
  }

  forgetPasword(email: string) {
    return this.http.post<any>(`${environment.apiUrl}forget-password`, { email })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user.token);
        return user;
      }));
  }

  signUp(users: User) {
    const url = `${environment.apiUrl}register`;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(url, users, { headers: httpHeaders })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('userData', JSON.stringify(user.userData));
        localStorage.setItem('currentUser', JSON.stringify(user.token));
        this.currentUserSubject.next(user.token);
        return user.token;
      }), catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ));
  }
  /* Error handler*/
  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    if ( error === 'INVALID_TOKEN' || error === 'Token has expired'){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return error;
    }
    return error;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('connData');
    localStorage.removeItem('fbUrl');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userData');
    localStorage.removeItem('googleURL');
    this.currentUserSubject.next(null);
  }
}
