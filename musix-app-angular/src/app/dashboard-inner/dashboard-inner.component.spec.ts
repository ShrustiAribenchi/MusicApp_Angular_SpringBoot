import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInnerComponent } from './dashboard-inner.component';

describe('DashboardInnerComponent', () => {
  let component: DashboardInnerComponent;
  let fixture: ComponentFixture<DashboardInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
