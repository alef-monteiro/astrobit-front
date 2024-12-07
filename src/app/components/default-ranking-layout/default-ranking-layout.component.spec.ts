import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRankingLayoutComponent } from './default-ranking-layout.component';

describe('DefaultRankingLayoutComponent', () => {
  let component: DefaultRankingLayoutComponent;
  let fixture: ComponentFixture<DefaultRankingLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultRankingLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultRankingLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
