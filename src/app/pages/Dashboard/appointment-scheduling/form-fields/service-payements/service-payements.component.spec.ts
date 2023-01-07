import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePayementsComponent } from './service-payements.component';

describe('ServicePayementsComponent', () => {
  let component: ServicePayementsComponent;
  let fixture: ComponentFixture<ServicePayementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePayementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePayementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
