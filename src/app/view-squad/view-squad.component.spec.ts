import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSquadComponent } from './view-squad.component';

describe('ViewSquadComponent', () => {
  let component: ViewSquadComponent;
  let fixture: ComponentFixture<ViewSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSquadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
