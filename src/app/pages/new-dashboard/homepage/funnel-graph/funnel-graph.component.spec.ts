import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelGraphComponent } from './funnel-graph.component';

describe('FunnelGraphComponent', () => {
  let component: FunnelGraphComponent;
  let fixture: ComponentFixture<FunnelGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunnelGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunnelGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
