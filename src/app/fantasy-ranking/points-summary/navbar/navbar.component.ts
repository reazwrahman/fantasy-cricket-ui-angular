import { Component, EventEmitter, Output } from '@angular/core';

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
