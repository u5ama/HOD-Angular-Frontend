import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderService} from '../../core/store/_services/loader.service';

@Component({
  selector: 'app-requestloader',
  templateUrl: './requestloader.component.html',
  styleUrls: ['./requestloader.component.css']
})
export class RequestloaderComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}
