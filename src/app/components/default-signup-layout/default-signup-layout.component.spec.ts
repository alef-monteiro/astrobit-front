import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSignupLayoutComponent } from './default-signup-layout.component';

describe('DefaultSignupLayoutComponent', () => {
  let component: DefaultSignupLayoutComponent;
  let fixture: ComponentFixture<DefaultSignupLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultSignupLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultSignupLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
