import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-points-details',
  standalone: true,
  imports: [],
  templateUrl: './points-details.component.html',
  styleUrl: './points-details.component.css'
})
export class PointsDetailsComponent { 

  @Input() tab!: string; // Receives tab value from parent 

  ngOnChanges(changes: SimpleChanges) {
    // Check if 'tab' has changed
    if (changes['tab']) {
      console.log(`Tab selected: ${this.tab}`); // Log the new tab value
    }
  }

}
