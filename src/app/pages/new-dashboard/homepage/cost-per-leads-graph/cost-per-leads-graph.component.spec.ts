import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPerLeadsGraphComponent } from './cost-per-leads-graph.component';

describe('CostPerLeadsGraphComponent', () => {
  let component: CostPerLeadsGraphComponent;
  let fixture: ComponentFixture<CostPerLeadsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostPerLeadsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostPerLeadsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
