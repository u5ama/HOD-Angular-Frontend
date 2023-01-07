import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbProgressBarsComponent } from './fb-progress-bars.component';

describe('FbProgressBarsComponent', () => {
  let component: FbProgressBarsComponent;
  let fixture: ComponentFixture<FbProgressBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbProgressBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbProgressBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
