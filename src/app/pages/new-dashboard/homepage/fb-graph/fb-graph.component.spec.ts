import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbGraphComponent } from './fb-graph.component';

describe('FbGraphComponent', () => {
  let component: FbGraphComponent;
  let fixture: ComponentFixture<FbGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
