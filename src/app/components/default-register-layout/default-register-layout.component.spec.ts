import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRegisterLayoutComponent } from './default-register-layout.component';

describe('DefaultRegisterLayoutComponent', () => {
  let component: DefaultRegisterLayoutComponent;
  let fixture: ComponentFixture<DefaultRegisterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRegisterLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultRegisterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
