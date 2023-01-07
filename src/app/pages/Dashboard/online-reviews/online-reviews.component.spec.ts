import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineReviewsComponent } from './online-reviews.component';

describe('OnlineReviewsComponent', () => {
  let component: OnlineReviewsComponent;
  let fixture: ComponentFixture<OnlineReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
