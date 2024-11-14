import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryInputDatalistComponent } from './secondary-input-datalist.component';

describe('SecondaryInputDatalistComponent', () => {
  let component: SecondaryInputDatalistComponent;
  let fixture: ComponentFixture<SecondaryInputDatalistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondaryInputDatalistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondaryInputDatalistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
