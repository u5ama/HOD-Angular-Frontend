import { Component, OnInit } from '@angular/core';
import {AuthNoticeService} from '../../core/auth/auth-notice/auth-notice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  /**
   * Component constructor
   * @param authNoticeService: authNoticeService
   */
  constructor(public authNoticeService: AuthNoticeService) { }

  ngOnInit(): void {
  }

}
