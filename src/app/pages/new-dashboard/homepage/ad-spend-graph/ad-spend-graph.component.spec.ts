import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSpendGraphComponent } from './ad-spend-graph.component';

describe('AdSpendGraphComponent', () => {
  let component: AdSpendGraphComponent;
  let fixture: ComponentFixture<AdSpendGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdSpendGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSpendGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
