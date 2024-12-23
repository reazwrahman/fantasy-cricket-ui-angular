import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadSelectionNavbarComponent } from './squad-selection-navbar.component';

describe('SquadSelectionNavbarComponent', () => {
  let component: SquadSelectionNavbarComponent;
  let fixture: ComponentFixture<SquadSelectionNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquadSelectionNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquadSelectionNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
