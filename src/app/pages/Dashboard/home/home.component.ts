import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from '../../../core/store/_services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as moment from 'moment';
// declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  overAllRating = 0;
  publicReviews = 0;
  sentiments = 0;
  userData: any;
  website: any;
  detected = false;
  showModal = false;
  notDetected = false;
  viewsGraph = false;
  accessToken: any;
  adsAccessToken: any;
  webs = [];
  AdsWebs = [];
  viewId = '';
  webName = '';
  WebWebsite = '';
  graphData = '';
  viewsCount = '';
  analyticsLoader = true;
   @ViewChild('myNewModel') content: any;
   @ViewChild('myNewModel') openModal: ElementRef;

  @ViewChild('myNewAdsModel') contentt: any;
  @ViewChild('myNewAdsModel') openAdsModal: ElementRef;

  notConnectedAds = true;
  connectedGoogleAds = false;
  notDetectedGoogleAds = false;
  // tslint:disable-next-line:ban-types
  dataSource: Object;
  constructor(private userService: UserService, public router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.website = this.userData.business_website;
    }
    this.getDashboardData();
    this.PrintParams();
    this.getKeywordsData();

    if (this.accessToken !== 0){
      this.googleConnect();
    }
    if (this.adsAccessToken !== 0){
        this.googleAdsConnect();
    }
    this.googleDetector();
    this.getGoogleAdsData();
  }
  GetParam(name){
    const results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results){
      return 0;
    }
    return results[1] || 0;
  }
  PrintParams() {
    this.accessToken =  this.GetParam('accessToken');
    this.adsAccessToken =  this.GetParam('accessAdwordsToken');
  }
  getDashboardData(){
    this.userService.getDashData().subscribe(res => {
      if (res !== ''){
        this.overAllRating = res.overAllRating;
        this.publicReviews = res.publicReviews;
        this.sentiments = res.sentiments;
      }
    });
  }
  /************* Google Analytics *************/
  googleDetector(){
   // this.analyticsLoader = true;
    this.userService.getGoogleData().subscribe(res => {
     if (res.webData !== null){
        if (res.webData.google_analytics === 0){
          this.notDetected = true;
          this.analyticsLoader = false;
        }
        else{
          if (res.webData.google_analytics_deleted === 1){
            this.detected = true;
            this.analyticsLoader = false;
          }else{
            this.detected = true;
            this.analyticsLoader = false;
            if (this.detected === true){
              this.getGoogleAnalyticsData('all');
            }
          }
        }
      }
    });
  }
  openGoogle(){
    this.userService.openGoogleAnalytics().subscribe(res => {
      this.router.navigateByUrl('/google_redirect');
    });
  }
  googleConnect(){
    this.userService.googleConnect(this.accessToken).subscribe(res => {
      if (res.accounts.records.length > 0){
        this.webs = res.accounts.records;
      }else{
        this.notFoundAlert();
      }
      if (res){
        this.openModel();
      }
    });
  }
  openModel(){
    this.openModal.nativeElement.click();
  }
  googleWebProperty(id, name, token){
    this.userService.googleWebProperty(id, name, token).subscribe(res => {
      if (res.accounts.records !== ''){
        this.viewId = res.accounts.records.view_id;
        this.webName = res.accounts.records.name;
        this.WebWebsite = res.accounts.records.website;
        this.googleProfile(token);
      }else{
        this.notFoundAlert();
      }
    });
  }
  googleProfile(token){
    this.userService.googleProfileViews(this.viewId, this.webName, this.WebWebsite, token).subscribe(res => {
      if (res.records !== '') {
        this.getGoogleAnalyticsData('all');
        this.opensweetalert();
      }
    });
  }
  opensweetalert()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Google Analytics Connected',
      icon: 'success',
    }).then((result) => {
      if (result.value){
      this.router.navigateByUrl('/dashboard');
      }
    });
  }
  notFoundAlert()
  {
    Swal.fire({
      title: '',
      text: 'No Website found on this Google Analytics Account.',
      icon: 'warning',
    }).then((result) => {
      if (result.value){
        this.openModal.nativeElement.click();
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
  getGoogleAnalyticsData(filterVal){
    this.detected = false;
    this.analyticsLoader = true;
    this.userService.getGoogleAnalytics(filterVal).subscribe(res => {
      if (res){
        this.viewsCount = res.myData.records[0].count;
        if (res.myData.records[0].graph_data){
          this.graphData = res.myData.records[0].graph_data;
          if (this.graphData !== ''){
            this.detected = false;
            this.viewsGraph = true;
            this.chartData(this.graphData);
            this.analyticsLoader = false;
          }
        }else if (res.myData.records[0].type === 'googleanalytics'){
          this.analyticsLoader = false;
        }
      }
      this.analyticsLoader = false;
    });
    this.detected = true;
    this.analyticsLoader = false;
  }
  chartData(nData){
    if (nData.length > 0){
      let i;
      for (i = 0; i < nData.length; i++){
        nData[i].ndate = nData[i].activity_date;
        nData[i].label = moment(nData[i].ndate).format('MMM YY');
        nData[i].value = nData[i].count;
        delete nData[i].activity_date;
        delete nData[i].count;
        delete nData[i].ndate;
      }
      const chartData = nData;
      const dataSource = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: chartData
      };
      this.dataSource = dataSource;
      this.analyticsLoader = false;
    }else{
      const chartData = [];
      const dataSource = {
        chart: {
          caption: '',
          subCaption: '',
          xAxisName: '',
          yAxisName: '',
          theme: 'fusion'
        },
        data: chartData
      };
      this.dataSource = dataSource;
      this.analyticsLoader = false;
    }
  }
  /************* Google Analytics Ends*************/

  /************* Keywords *************/
  getKeywordsData(){
    this.userService.getKeywordsData().subscribe(res => {
    });
  }
  /************* Keywords *************/

 /************* Google Ads *************/
 openGoogleAds(){
   this.userService.openGoogleAds().subscribe(res => {
     this.router.navigateByUrl('/google_redirect');
   });
 }

  googleAdsConnect(){
    this.userService.googleAdsConnection(this.adsAccessToken).subscribe(res => {
      if (res.accounts.records.length > 0){
        this.AdsWebs = res.accounts.records;
      }else{
        this.notFoundAdsAlert();
      }
      if (res){
        this.openAdsModel();
      }
    });
  }
  openAdsModel(){
    this.openAdsModal.nativeElement.click();
  }
  getAdsWebProperty(id, name, token){
    this.userService.googleAdsWebProperty(id, name, token).subscribe(res => {
      if (res.accounts.records !== ''){
        this.viewId = res.accounts.records.view_id;
        this.webName = res.accounts.records.name;
        this.WebWebsite = res.accounts.records.website;
        this.googleAdsData(token);
        this.campaignService();
      }else{
        this.notFoundAdsAlert();
      }
    });
  }

  googleAdsData(token){
    this.userService.googleAdsProfileViews(this.viewId, this.webName, this.WebWebsite, token).subscribe(res => {
      if (res.records !== '') {
        this.opensweetalertAds();
      }
    });
  }
  campaignService(){
    this.userService.CampaignService(this.viewId, this.adsAccessToken).subscribe(res => {
      console.log(res);
    });
  }
  opensweetalertAds()
  {
    Swal.fire({
      title: 'Successful!',
      text: 'Google Ads Connected',
      icon: 'success',
    }).then((result) => {
      if (result.value){
        this.router.navigateByUrl('/dashboard');
        this.getGoogleAdsData();
      }
    });
  }
  notFoundAdsAlert()
  {
    Swal.fire({
      title: '',
      text: 'No Website found on this Google Ads Account.',
      icon: 'warning',
    }).then((result) => {
      if (result.value){
        this.openModal.nativeElement.click();
        this.router.navigateByUrl('/dashboard');
      }
    });
  }
  getGoogleAdsData(){
    this.userService.getGoogleData().subscribe(res => {
      if (res.webData !== null){
        if (res.webData.google_analytics === 0){
          this.notConnectedAds = false;
          this.notDetectedGoogleAds = true;
          this.connectedGoogleAds = false;
        }else{
          if (res.webData.gad_connected !== 1){
            this.notConnectedAds = true;
            this.connectedGoogleAds = false;
          }
          else if (res.webData.google_adwords_deleted === 1){
            this.connectedGoogleAds = false;
            this.notConnectedAds = true;
          }else {
            this.connectedGoogleAds = true;
            this.notConnectedAds = false;
          }
        }
      }
    });
  }
  /************* Google Ads *************/
}

