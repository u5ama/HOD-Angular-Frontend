import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, OnDestroy, Output } from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthNoticeService} from '../../../core/auth/auth-notice/auth-notice.service';
import {AuthNotice} from '../../../core/auth/auth-notice/auth-notice.interface';

@Component({
  selector: 'app-auth-notice',
  templateUrl: './auth-notice.component.html',
  styleUrls: ['./auth-notice.component.css']
})
export class AuthNoticeComponent implements OnInit {
  @Output() type: any;
  @Output() message: any = '';

  private subscriptions: Subscription[] = [];

  constructor(public authNoticeService: AuthNoticeService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authNoticeService.onNoticeChanged$.subscribe(
      (notice: AuthNotice) => {
        notice = Object.assign({}, {message: '', type: ''}, notice);
        this.message = notice.message;
        this.type = notice.type;
        this.cdr.markForCheck();
      }
    ));
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

}
