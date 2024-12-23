import { Component } from '@angular/core'; 
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-squad-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-squad-selection.component.html',
  styleUrl: './test-squad-selection.component.css'
})
export class TestSquadSelectionComponent { 

  players:String[] = []; 
  selectionCounter:number = 0;

  selections = [
    { id: 1, name: 'Warner', selected: false },
    { id: 2, name: 'Kohli', selected: false },
    { id: 3, name: 'Root', selected: false },
    { id: 4, name: 'Williamson', selected: false },
  ];

  // Triggered on change of selection
  onSelectionChange(item: any, event: any) { 
    
    item.selected = false;
    //item.selected = event.target.checked;
    this.runBusinessLogic(item); 
  }

  // Business logic example
  runBusinessLogic(item: any) { 
    let itemSelected = this.selections.filter(item => item.selected);
    this.players = [];

    itemSelected.forEach((item, index) =>{  
      this.players.push(item.name);
    });    
    // Add your custom logic here
  }

  // Get list of selected items
  getSelectedItems() {   
    return this.players;
  }
}
