import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleGraphComponent } from './google-graph.component';

describe('GoogleGraphComponent', () => {
  let component: GoogleGraphComponent;
  let fixture: ComponentFixture<GoogleGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
