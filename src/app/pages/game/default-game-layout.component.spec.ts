import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultGameLayoutComponent } from './default-game-layout.component';

describe('DefaultGameLayoutComponent', () => {
  let component: DefaultGameLayoutComponent;
  let fixture: ComponentFixture<DefaultGameLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultGameLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultGameLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
