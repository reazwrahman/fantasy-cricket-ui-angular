import { Component, EventEmitter, Output } from '@angular/core';

export const BATTERS_TAB = "batters"; 
export const BOWLERS_TAB = "bowlers"; 
export const BONUS_TAB = "bonus"; 
export const SUBMIT_TAB = "submit";

@Component({
  selector: 'app-squad-selection-navbar',
  standalone: true,
  imports: [],
  templateUrl: './squad-selection-navbar.component.html',
  styleUrl: './squad-selection-navbar.component.css'
})
export class SquadSelectionNavbarComponent {
  selectedTab: string = BATTERS_TAB; // Default selected tab

  @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

  selectTab(tab: string) {
      this.selectedTab = tab;
      this.tabSelected.emit(tab); // Emit the selected tab to parent
  }
}
