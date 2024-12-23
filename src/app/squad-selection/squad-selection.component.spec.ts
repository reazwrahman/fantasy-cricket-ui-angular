import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadSelectionComponent } from './squad-selection.component';

describe('SquadSelectionComponent', () => {
  let component: SquadSelectionComponent;
  let fixture: ComponentFixture<SquadSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquadSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
