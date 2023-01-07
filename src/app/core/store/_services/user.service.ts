import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../auth/_models/user';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class UserService {
  public accessToken: any;
  private currentUserSubject: BehaviorSubject<User>;
  userData: any;
  businessID: any;
  userID: any;
  headers;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public currentUser: Observable<User>;
  /* Business process*/
  sendRequest() {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}done-me`, {token: this.accessToken, send: 'business-process'})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Business process*/
  /* Reviews*/
  getReviews() {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}all-reviews`, {token: this.accessToken}).pipe(
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Reviews ends*/
  /* Connections*/
  submitLink(link) {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}done-me`, {busniess_id: '', userID: '', token: this.accessToken, type: 'GooglePlaces', send: 'manual-connect-business', targetUrl: link}).pipe(
      map(res => {
        localStorage.setItem('connData', JSON.stringify(res.data));
      }),
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  /*Facebook*/
  getFacebookConData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.get(`${environment.apiUrl}social-media/connection-data?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  PageDetails(token){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {access_token: token};
    return this.http.get(`${environment.apiUrl}social-media/page-detail?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  connectionFacebook() {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.businessID = this.userData.business_id;
    this.userID = this.userData.id;
    return this.http.get(`${environment.apiUrl}social-media/login?` + `business_id=` + this.businessID).pipe(
      map(res => {
        localStorage.setItem('fbUrl', JSON.stringify(res));
      }),
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /*FaceBook ADs*/
  connectionFacebookAds() {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.businessID = this.userData.business_id;
    this.userID = this.userData.id;
    return this.http.get(`${environment.apiUrl}fb-reports/login?` + `business_id=` + this.businessID).pipe(
      map(res => {
        localStorage.setItem('fbUrl', JSON.stringify(res));
      }),
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /*FaceBook ADs*/
  selectPage(token, id, businessId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}done-me`, {token: this.accessToken, type: 'facebook', page_id: id, accessToken: token, business_id: businessId, send: 'manual-connect-business'}).pipe(
      map(res => {
       // localStorage.removeItem('connData');
      }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  FbAdsReports(token){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {access_token: token};
    return this.http.get(`${environment.apiUrl}fb-reports/reports-details?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /*Facebook*/
  getConnectionsData() {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    this.businessID = this.userData.business_id;
    this.userID = this.userData.id;
    return this.http.post<any>(`${environment.apiUrl}connections-data`, {token: this.accessToken, business_id: this.businessID}).pipe(
      map(res => {
        localStorage.setItem('connData', JSON.stringify(res.allData));
      }),
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteConnection(connType){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}done-me`, {token: this.accessToken, type: connType, send: 'unlink-app'}).pipe(
      map(res => {
         localStorage.removeItem('connData');
      }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  deleteGoogleConnection(connType, businessId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}done-me`, {token: this.accessToken, type: connType, id: businessId, send: 'unlink-app'}).pipe(
      map(res => {
         localStorage.removeItem('connData');
      }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  searchReview(search, source, time, rating) {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>
    (`${environment.apiUrl}search-reviews`,
      {token: this.accessToken, searchVal: search, sourceFilter: source, timeFilter: time, ratingFilter: rating}).pipe(
    catchError( (err: any, caught: Observable<any>) => {
      return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Connections ends*/

  /* Customers*/
  deleteCustomer(custID) {
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {customerID: custID};
    return this.http.get(`${environment.apiUrl}crm-delete-customer?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addContact(usersData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const url = `${environment.apiUrl}crm-add-customer?token=` + this.accessToken;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(url, usersData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  uploadCSV(file){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const url = `${environment.apiUrl}crm-upload-customer-csv?token=` + this.accessToken;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(url, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  customerService(userData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const url = `${environment.apiUrl}crm-background-service?token=` + this.accessToken;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(url, userData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  sendInstantMail(uId, selectOption){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const url = `${environment.apiUrl}crm-add-customer?token=` + this.accessToken;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(url, {u_id: uId, flag: 'Yes', sending_option: selectOption})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  updateContact(userData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const url = `${environment.apiUrl}crm-update-customer?token=` + this.accessToken;
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<any>(url, userData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getCusData(cusId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {customerID: cusId};
    return this.http.get(`${environment.apiUrl}crm-get-customer?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  searchCustomer(val){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>
    (`${environment.apiUrl}search-customer`,
      {token: this.accessToken, keyword: val}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Customers ends*/

  /* Settings */
  getCompanyRecord(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    // const data = {customerID: custID};
    return this.http.get(`${environment.apiUrl}company?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  updateCompanyImage(logo){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('attach_logo', logo);
    formData.append('send', 'update-business-profile');
    return this.http.post<any[]>(`${environment.apiUrl}done-me?` + `token=` + this.accessToken, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  updateCompany(myPhone, web, myCity, myState, myCountry, myAddress, myZip){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}done-me?` + `token=` + this.accessToken, {send: 'update-business-profile', phone: myPhone,
      website: web, city: myCity, country: myCountry, address: myAddress, zip_code: myZip, state: myState})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Settings ends*/

  /* Email Settings*/
  getEmailSettings(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    // const data = {customerID: custID};
    return this.http.get(`${environment.apiUrl}email?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  updateAvatar(avatar){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('personal_avatar_src', avatar);
    return this.http.post<any[]>(`${environment.apiUrl}emailPersonalizeDesign?` + `token=` + this.accessToken, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  logoImage(logo){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('logo_image_src', logo);
    return this.http.post<any[]>(`${environment.apiUrl}emailPersonalizeDesign?` + `token=` + this.accessToken, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  backgroundImage(back){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('background_image_src', back);
    return this.http.post<any[]>(`${environment.apiUrl}emailPersonalizeDesign?` + `token=` + this.accessToken, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  mailTemplate(subject, heading, message, positive, negative){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}emailSentUser?` + `token=` + this.accessToken, { email_subject: subject,
      email_heading: heading, email_message: message, positive_answer: positive, negative_answer: negative})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  personalData(fullName, role){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}personalizeTouch?` + `token=` + this.accessToken, { full_name: fullName,
      company_role: role})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  negativeData(subject, body){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}emailNegativeAnswerSetup?` + `token=` + this.accessToken, { email_negative_answer_setup_heading: subject,
      email_negative_answer_setup_message: body})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addColorsData(cNumber, star, back){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}emailPersonalizeDesign?` + `token=` + this.accessToken, { review_number_color: cNumber,
      star_rating_color: star, top_background_color: back})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Email Settings ends*/

  /* SMS Settings */
  getSmsRecords(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    // const data = {customerID: custID};
    return this.http.get(`${environment.apiUrl}sms?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  smsImage(smsImg){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
    const formData: FormData = new FormData();
    formData.append('sms_image', smsImg);
    return this.http.post<any[]>(`${environment.apiUrl}smsImage?` + `token=` + this.accessToken, formData, { headers: httpHeaders })
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  saveSmsMessage(msg){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}smsMessage?` + `token=` + this.accessToken, { sms_message: msg})
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* SMS Settings ends*/

  /* Dashboard Data */
  getDashData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.get(`${environment.apiUrl}home?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDashReviewStats(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {category_type: 'RV',
      type: 'google places',
      is_type: 'all'
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDashRatingStats(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {category_type: 'RG',
      type: 'google places',
      is_type: 'all'
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getGoogleData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}google-detector?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  getSuppData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}support-data?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  getLeadsData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-all-leads?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getKeywordsImprov(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-keywords-improvements?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Dashboard Data ends*/

  /* Dashboard Google Analytics */

  openGoogleAnalytics(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}google-analytics/get-login?` + `token=` + this.accessToken).pipe(
      map(res => {
        localStorage.setItem('googleURL', JSON.stringify(res));
      }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  googleConnect(accessToken){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {googleToken: accessToken};
    return this.http.get(`${environment.apiUrl}google-analytics/get-accounts?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  googleWebProperty(busId, busName, busToken){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {acountId: busId, name: busName, googleToken: busToken};
    return this.http.get(`${environment.apiUrl}google-analytics/get-web-property?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  googleProfileViews(vId, webName, webSite, token){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {viewId: vId, name: webName, website: webSite, googleToken: token};
    return this.http.get(`${environment.apiUrl}google-analytics/get-profile-view?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getGoogleAnalytics(filterVal){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
  //  console.log(filterVal);
    const data = {category_type: 'PV',
      type: 'Googleanalytics',
      is_type: filterVal
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Dashboard Google Analytics Ends */


  /* Dashboard Google Adwords */

  openGoogleAds(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}google-sense/my-login?` + `token=` + this.accessToken).pipe(
      map(res => {
        localStorage.setItem('googleURL', JSON.stringify(res));
      }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  googleAdsConnection(accessToken){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {googleToken: accessToken};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-accounts?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  CampaignService(id, accessToken){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {googleToken: accessToken, viewId: id};
    return this.http.get(`${environment.apiUrl}google-sense/get-campaign?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  googleAdsWebProperty(busId, busName, busToken){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {acountId: busId, name: busName, googleToken: busToken};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-web?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  googleAdsProfileViews(vId, webName, webSite, token){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {viewId: vId, name: webName, website: webSite, googleToken: token};
    return this.http.get(`${environment.apiUrl}google-sense/get-profile-data?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getSenseAllData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-data?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getSenseStatData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-stats?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDashAdsSpendStats(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {category_type: 'AS',
      type: 'google adwords',
      is_type: 'all'
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDashCostLeadStats(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {category_type: 'CC',
      type: 'google adwords',
      is_type: 'all'
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  getDashAdsRevenueData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {category_type: 'AC',
      type: 'google adwords',
      is_type: 'all'
    };
    return this.http.get(`${environment.apiUrl}get-stats?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDashAdsSpendData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {type: 'AS'};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-graphData?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /*getDashAdsRevenueData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {type: 'AC'};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-graphData?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }*/
  getDashCostLeadData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {type: 'CC'};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-graphData?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  getDashRevenueData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {type: 'AC'};
    return this.http.get(`${environment.apiUrl}google-sense/get-sense-graphData?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Dashboard Google Adwords Ends */

  /* Dashboard Facebook  */

  getDashFBData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}fb-widget?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }




  /* Dashboard Facebook Ends */


  /* Custom Form */
    submitCustomForm(allData){
      this.accessToken = localStorage.getItem('currentUser');
      this.accessToken = JSON.parse(this.accessToken);

      return this.http.post<any[]>(`${environment.apiUrl}save-custom-form?` + `token=` + this.accessToken, allData)
        .pipe(
          catchError( (err: any, caught: Observable<any>) => {
            return throwError(this.generalErrorHandler(err, caught)); } ) );
    }

  getCustomFormData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-custom-form?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteField(data){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}delete-form-field?` + `token=` + this.accessToken, data)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  deleteCustomField(data){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}delete-new-form-field?` + `token=` + this.accessToken, data)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDeleteField(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-deleted-fields?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addFields(data){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}add-form-field?` + `token=` + this.accessToken, data)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getAddedField(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-form-field?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Custom Form */

  /* Countries */
  getAllCountries(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-all-countries?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Countries */


  /* CTM BOX */
  submitCTM(authData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}loginCTM?` + `token=` + this.accessToken, authData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getAccountConnected(accountId, accountName){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {account_id: accountId, account_name: accountName};
    return this.http.get(`${environment.apiUrl}get-account-connected?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  getCTMRecord(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-call-details?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  deleteCTM(userId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}delete-ctm?` + `token=` + this.accessToken, userId)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* CTM BOX */

  /* Appointments */

  getAppointments(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-all-appointments?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getAppointmentDetail(id){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    const data = {appointment_id: id};
    return this.http.get(`${environment.apiUrl}get-appointment-detail?` + `token=` + this.accessToken, {params: data}).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  /* Custom Appointments Form */
  submitAppointmentsCustomForm(allData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);

    return this.http.post<any[]>(`${environment.apiUrl}save-appointment-form?` + `token=` + this.accessToken, allData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getCustomAppointmentsFormData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-appointment-form?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Custom Appointments Form */

  /* Custom Appointments Form Settings*/
  addLocation(locData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}save-appointment-form?` + `token=` + this.accessToken, locData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addCategory(catData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}save-appointment-form?` + `token=` + this.accessToken, catData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addService(servData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}save-appointment-form?` + `token=` + this.accessToken, servData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addAppointmentDates(apptData){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}save-appointment-form?` + `token=` + this.accessToken, apptData)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  addPaymentScript(script){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any[]>(`${environment.apiUrl}save-payment-script?` + `token=` + this.accessToken, script)
      .pipe(
        catchError( (err: any, caught: Observable<any>) => {
          return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteLocation(locationId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}delete-appointment-type`, {token: this.accessToken, location_id: locationId, type: 'location'}).pipe(
      // map(res => {
      // /*  localStorage.removeItem('connData');*/
      // }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteCategory(catId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}delete-appointment-type`, {token: this.accessToken, category_id: catId, type: 'category'}).pipe(
      /*map(res => {
        /!*  localStorage.removeItem('connData');*!/
      }),*/
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteService(serviceId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}delete-appointment-type`, {token: this.accessToken, service_id: serviceId, type: 'service'}).pipe(
     /* map(res => {
        /!*  localStorage.removeItem('connData');*!/
      }),*/
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  deleteDates(dateId){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.post<any>(`${environment.apiUrl}delete-appointment-type`, {token: this.accessToken, appointment_id: dateId, type: 'date'}).pipe(
      // map(res => {
      //   /*  localStorage.removeItem('connData');*/
      // }),
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getLocations(): Observable<any>{
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-appointments-location?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getCategories(): Observable<any>{
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-appointments-category?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getServices(): Observable<any>{
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-appointments-services?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  getDates(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-appointments-dates?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }
  /* Custom Appointments Form Settings*/
  /* Appointments */

  /* Keywords */
  getKeywordsData(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-keywords-data?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  /* Keywords */

  /* Overview */
  getCRMOverview(){
    this.accessToken = localStorage.getItem('currentUser');
    this.accessToken = JSON.parse(this.accessToken);
    return this.http.get(`${environment.apiUrl}get-all-overviews?` + `token=` + this.accessToken).pipe(
      catchError( (err: any, caught: Observable<any>) => {
        return throwError(this.generalErrorHandler(err, caught)); } ) );
  }

  /* Overview */

  /* Error handler*/
  generalErrorHandler(error: any, caught: Observable<any>): Observable<any> {
    if ( error === 'INVALID_TOKEN' || error === 'Token has expired'){
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      return error;
    }
    return error;
  }
}
