import { Component, EventEmitter, Output } from '@angular/core';


export const SUMMARY_TAB = "summary"; 
export const BATTING_TAB = "batting"; 
export const BOWLING_TAB = "bowling"; 
export const FIELDING_TAB = "fielding";

@Component({
    selector: 'app-navbar', 
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
    selectedTab: string = 'summary'; // Default selected tab

    @Output() tabSelected: EventEmitter<string> = new EventEmitter<string>();

    selectTab(tab: string) {
        this.selectedTab = tab;
        this.tabSelected.emit(tab); // Emit the selected tab to parent
    }
}
