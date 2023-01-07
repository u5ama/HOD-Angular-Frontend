import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CtmComponent } from './ctm.component';

describe('CtmComponent', () => {
  let component: CtmComponent;
  let fixture: ComponentFixture<CtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
