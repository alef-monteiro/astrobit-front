import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultDashboardLayoutComponent } from './default-dashboard-layout.component';

describe('DefaultDashboardLayoutComponent', () => {
  let component: DefaultDashboardLayoutComponent;
  let fixture: ComponentFixture<DefaultDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
