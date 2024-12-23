import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSquadComponent } from './submit-squad.component';

describe('SubmitSquadComponent', () => {
  let component: SubmitSquadComponent;
  let fixture: ComponentFixture<SubmitSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitSquadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
