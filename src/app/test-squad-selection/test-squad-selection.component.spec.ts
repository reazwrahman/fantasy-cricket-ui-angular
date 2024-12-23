import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSquadSelectionComponent } from './test-squad-selection.component';

describe('TestSquadSelectionComponent', () => {
  let component: TestSquadSelectionComponent;
  let fixture: ComponentFixture<TestSquadSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSquadSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSquadSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
