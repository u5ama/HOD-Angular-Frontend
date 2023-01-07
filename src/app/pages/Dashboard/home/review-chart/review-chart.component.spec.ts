import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewChartComponent } from './review-chart.component';

describe('ReviewChartComponent', () => {
  let component: ReviewChartComponent;
  let fixture: ComponentFixture<ReviewChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
