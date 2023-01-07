import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../../../core/store/_services/user.service';
import {FormBuilder} from '@angular/forms';
import {AuthNoticeService} from '../../../../core/auth/auth-notice/auth-notice.service';

@Component({
  selector: 'app-form-fields',
  templateUrl: './form-fields.component.html',
  styleUrls: ['./form-fields.component.css']
})
export class FormFieldsComponent implements OnInit {
  @Input() text: string;
  @Output() locationData = new EventEmitter();
  locations = [];
  categories = [];
  services = [];
  constructor(private userService: UserService, private fb: FormBuilder, public authNoticeService: AuthNoticeService) { }

  ngOnInit(): void {
  }

  callData(){
  }
}
