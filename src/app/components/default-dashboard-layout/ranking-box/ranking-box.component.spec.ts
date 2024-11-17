import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingBoxComponent } from './ranking-box.component';

describe('RankingBoxComponent', () => {
  let component: RankingBoxComponent;
  let fixture: ComponentFixture<RankingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
