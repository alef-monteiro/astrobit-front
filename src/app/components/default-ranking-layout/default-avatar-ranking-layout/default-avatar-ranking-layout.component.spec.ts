import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAvatarRankingLayoutComponent } from './default-avatar-ranking-layout.component';

describe('DefaultAvatarRankingLayoutComponent', () => {
  let component: DefaultAvatarRankingLayoutComponent;
  let fixture: ComponentFixture<DefaultAvatarRankingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultAvatarRankingLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultAvatarRankingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
