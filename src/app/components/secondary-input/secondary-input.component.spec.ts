import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryInputComponent } from './secondary-input.component';

describe('SecondaryInputComponent', () => {
  let component: SecondaryInputComponent;
  let fixture: ComponentFixture<SecondaryInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
