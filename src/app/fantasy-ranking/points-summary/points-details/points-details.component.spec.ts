import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsDetailsComponent } from './points-details.component';

describe('PointsDetailsComponent', () => {
  let component: PointsDetailsComponent;
  let fixture: ComponentFixture<PointsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PointsDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PointsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
