import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalLeadsGraphComponent } from './total-leads-graph.component';

describe('TotalLeadsGraphComponent', () => {
  let component: TotalLeadsGraphComponent;
  let fixture: ComponentFixture<TotalLeadsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalLeadsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalLeadsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
