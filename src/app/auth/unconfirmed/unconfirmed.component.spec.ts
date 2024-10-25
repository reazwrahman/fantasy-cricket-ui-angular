import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnconfirmedComponent } from './unconfirmed.component';

describe('UnconfirmedComponent', () => {
  let component: UnconfirmedComponent;
  let fixture: ComponentFixture<UnconfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnconfirmedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnconfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
