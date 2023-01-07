import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTrafficSourceDoughnutComponent } from './website-traffic-source-doughnut.component';

describe('WebsiteTrafficSourceDoughnutComponent', () => {
  let component: WebsiteTrafficSourceDoughnutComponent;
  let fixture: ComponentFixture<WebsiteTrafficSourceDoughnutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTrafficSourceDoughnutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTrafficSourceDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
