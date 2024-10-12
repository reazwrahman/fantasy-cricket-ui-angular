import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FantasyRankingComponent } from './fantasy-ranking.component';

describe('FantasyRankingComponent', () => {
  let component: FantasyRankingComponent;
  let fixture: ComponentFixture<FantasyRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FantasyRankingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FantasyRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
