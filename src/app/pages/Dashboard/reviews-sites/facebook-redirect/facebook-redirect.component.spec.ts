import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookRedirectComponent } from './facebook-redirect.component';

describe('FacebookRedirectComponent', () => {
  let component: FacebookRedirectComponent;
  let fixture: ComponentFixture<FacebookRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
