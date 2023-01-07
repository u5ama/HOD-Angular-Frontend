import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsChartComponent } from './leads-chart.component';

describe('LeadsChartComponent', () => {
  let component: LeadsChartComponent;
  let fixture: ComponentFixture<LeadsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
