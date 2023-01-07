import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestloaderComponent } from './requestloader.component';

describe('RequestloaderComponent', () => {
  let component: RequestloaderComponent;
  let fixture: ComponentFixture<RequestloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
