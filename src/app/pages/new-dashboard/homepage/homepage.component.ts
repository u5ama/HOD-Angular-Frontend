import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../core/store/_services/user.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  totalLeads = 0;
  LeadsPercent = 0;
  ReviewsPercent = 0;
  overAllRating = 0;
  publicReviews = 0;
  keywordTotal = 0;
  keywordPercent = 0;

  userData: any;
  website: any;
  accessToken: any;
  adsAccessToken: any;

  supportName = 'Support';
  supportEmail = '';
  supportPhone = '';
  supportImage = '';
  spImage = false;
  sampleImage = true;

  keywords = [];
  userName: any;

  accounts = [];
  AdsWebs = [];
  viewId = '';
  webName = '';
  WebWebsite = '';
  notConnectedAds = true;
  connectedGoogleAds = false;
  AdsClicks = 0;
  AdsImpressions = 0;
  costPer = 0;
  AdsConversions = 0;
  adsSpend = 0;
  shareImpression = 0;

  CostPercent = 0;
  ClicksPercent = 0;
  ImpressionsPercent = 0;
  AdsSpendLastMonth = 0;

  AdsSpendTotal = 0;
  AdsSpendPercent = 0;

  CostLeadTotal = 0;
  CostLeadPercent = 0;

  RevenueTotal = 0;
  RevenuePercent = 0;

  faceBookLikes = 0;
  likesPercentage = 0;

  @ViewChild('myNewModel') content: any;
  @ViewChild('myNewModel') openModal: ElementRef;
  constructor(private userService: UserService, public router: Router) { }

  ngOnInit(): void {
    this.userData = localStorage.getItem('userData');
    this.userData = JSON.parse(this.userData);
    if (this.userData !== null){
      this.website = this.userData.business_website;
      this.userName = this.userData.first_name ;
    }
    this.PrintParams();
   // this.initCusForm();
    if (this.accessToken !== 0){
     // this.googleConnect();
      this.googleAdsConnect();
    }
    // if (this.adsAccessToken !== 0){
    //   this.googleAdsConnect();
    // }
    this.getGoogleAdsData();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.getDashboardData();
    this.getSupportData();
    this.getKeywordsData();
    this.getKeywordsImprovements();
    this.getLeads();
   // this.getCTMDetails();
    this.getAdsData();
    this.graphStatsAds();
    this.getDashAdsSpend();
    this.getDashCostLeadData();
    this.getDashRevenueData();
    this.getFacebookWidgetData();
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
        this.ReviewsPercent = res.totalPercentage;
      }
    });
  }
  /************* Leads *************/
  getLeads(){
    this.userService.getLeadsData().subscribe(res => {
      if (res.leads.records !== ''){
        this.totalLeads = res.leads.records.count;
      }
      if (res.leadsGrowth.records !== ''){
        this.LeadsPercent = res.leadsGrowth.records.percent;
      }
    });
  }
  /************* Leads *************/

  /************* Keywords *************/
  getKeywordsData(){
    this.userService.getKeywordsData().subscribe(res => {
     // console.log(res);
      if (res !== ''){
        this.keywords = res.record;
      }
    });
  }

  getKeywordsImprovements(){
    this.userService.getKeywordsImprov().subscribe(res => {
     // console.log(res);
      if (res !== ''){
        this.keywordTotal = res.total;
        this.keywordPercent = res.percent;
      }
    });
  }
  /************* Keywords *************/
  /************* Support *************/
  getSupportData(){
    this.userService.getSuppData().subscribe(res => {
      if (res !== ''){
        this.supportName = res.support.name;
        this.supportEmail = res.support.email;
        this.supportPhone = res.support.phone_number;
        this.supportImage = res.support.image;
        this.spImage = true;
        this.sampleImage = false;
      }else{
        this.supportName = 'Support';
        this.spImage = false;
        this.sampleImage = true;
      }
    });
  }
  /************* Google Ads *************/
  openGoogleAds(){
    this.userService.openGoogleAds().subscribe(res => {
      this.router.navigateByUrl('/google_redirect');
    });
  }
  googleAdsConnect(){
    this.userService.googleAdsConnection(this.accessToken).subscribe(res => {
      if (res.accounts.records.length > 0){
        this.AdsWebs = res.accounts.records;
        this.openModel();
      }else{
        this.notFoundAdsAlert();
      }
      // console.log(this.webs);
      if (res){
       this.openModel();
      }
    });
  }
  openModel(){
    this.openModal.nativeElement.click();
  }
  getAdsWebProperty(id, name, token){
    this.userService.googleAdsWebProperty(id, name, token).subscribe(res => {
      if (res.accounts.records !== ''){
        this.viewId = res.accounts.records.view_id;
        this.webName = res.accounts.records.name;
        this.WebWebsite = res.accounts.records.website;
        this.googleAdsData(token);
      }else{
        this.notFoundAdsAlert();
      }
    });
  }

  googleAdsData(token){
    this.userService.googleAdsProfileViews(this.viewId, this.webName, this.WebWebsite, token).subscribe(res => {
      // console.log(res.records);
      if (res.records !== '') {
        // this.getGoogleAnalyticsData('all');
        this.opensweetalertAds();
      }
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
        // window.location.reload();
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
        // window.location.reload();
        this.router.navigateByUrl('/dashboard');
        // this.getCustomers();
      }
    });
  }
  getAdsData(){
    this.userService.getGoogleData().subscribe(res => {
      if (res.webData !== null){
          if (res.webData.gad_connected !== 1){
            this.notConnectedAds = true;
            this.connectedGoogleAds = false;
            this.getChartData();
          }
          else if (res.webData.google_adwords_deleted === 1){
            // console.log('i am here 2');
            this.connectedGoogleAds = false;
            this.notConnectedAds = true;
          }else {
            this.connectedGoogleAds = true;
            this.notConnectedAds = false;
            this.getChartData();
          }
        }
    });
  }
  getChartData(){
    this.userService.getSenseAllData().subscribe(res => {
     // console.log(res);
      if (res.data.records !== ''){
        this.AdsClicks = res.data.records.clicks;
        this.AdsImpressions = res.data.records.impressions;
        this.costPer = res.data.records.cost_per_conversions;
        this.AdsConversions = res.data.records.conversions;
        this.adsSpend = res.data.records.adsSpend;
        this.shareImpression = res.data.records.impression_share;
      }
    });
  }

  graphStatsAds(){
    this.userService.getSenseStatData().subscribe(res => {

      if (res.data.records !== ''){
        this.CostPercent = res.data.records.costPerConversion;
        this.ClicksPercent = res.data.records.adsClicks;
        this.ImpressionsPercent = res.data.records.adsImpressions;
        this.AdsSpendLastMonth = res.data.records.AdsSpend;
      }
    });
  }

  getDashAdsSpend(){
    this.userService.getDashAdsSpendData().subscribe(res => {
     // console.log(res);
      if (res.data.records !== ''){
        this.AdsSpendTotal = res.data.records.total;
        this.AdsSpendPercent = res.data.records.Percent;
      }
    });
  }
  getDashCostLeadData(){
    this.userService.getDashCostLeadData().subscribe(res => {
     // console.log(res);
      if (res.data.records !== ''){
        this.CostLeadTotal = res.data.records.total;
        this.CostLeadPercent = res.data.records.Percent;
      }
    });
  }
  getDashRevenueData(){
    this.userService.getDashRevenueData().subscribe(res => {
     // console.log(res);
      if (res.data.records !== ''){
        this.RevenueTotal = res.data.records.total;
        this.RevenuePercent = res.data.records.Percent;
      }
    });
  }
  getGoogleAdsData(){
    this.userService.getGoogleData().subscribe(res => {
      if (res.webData !== null){
        if (res.webData.google_analytics === 0){
          this.notConnectedAds = false;
         // this.notDetectedGoogleAds = true;
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


  /************FaceBook ***************/
  getFacebookWidgetData(){
    this.userService.getDashFBData().subscribe(res => {
      // console.log(res);
       if (res.records !== ''){
         this.faceBookLikes = res.records.pageLikes;
         this.likesPercentage = res.records.likesPercent;
       }
    });
  }
  /************FaceBook ***************/
}
