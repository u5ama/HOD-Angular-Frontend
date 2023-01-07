import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteTrafficSourceGraphComponent } from './website-traffic-source-graph.component';

describe('WebsiteTrafficSourceGraphComponent', () => {
  let component: WebsiteTrafficSourceGraphComponent;
  let fixture: ComponentFixture<WebsiteTrafficSourceGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteTrafficSourceGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteTrafficSourceGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
