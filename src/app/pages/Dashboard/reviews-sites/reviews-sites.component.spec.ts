import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsSitesComponent } from './reviews-sites.component';

describe('ReviewsSitesComponent', () => {
  let component: ReviewsSitesComponent;
  let fixture: ComponentFixture<ReviewsSitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewsSitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsSitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
