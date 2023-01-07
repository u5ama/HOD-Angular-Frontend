import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReviewsGraphComponent } from './total-reviews-graph.component';

describe('TotalReviewsGraphComponent', () => {
  let component: TotalReviewsGraphComponent;
  let fixture: ComponentFixture<TotalReviewsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalReviewsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalReviewsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
