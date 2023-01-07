import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsGraphComponent } from './leads-graph.component';

describe('LeadsGraphComponent', () => {
  let component: LeadsGraphComponent;
  let fixture: ComponentFixture<LeadsGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
