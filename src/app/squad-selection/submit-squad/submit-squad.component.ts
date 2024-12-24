import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Game } from '../squad-selection.component'
import { FantasyRankingService } from '../../services/fantasy-ranking.service';
import { UserInfo } from '../../services/auth.service';
import { MainNavbarComponent } from '../../main-navbar/main-navbar.component';
import { SquadSelectionNavbarComponent } from '../squad-selection-navbar/squad-selection-navbar.component';
import { TimerComponent } from '../../timer/timer.component';
import { BATTERS_TAB, BOWLERS_TAB, BONUS_TAB, SUBMIT_TAB } from '../squad-selection-navbar/squad-selection-navbar.component';



export const SELECTED_GAME = "squad-selecton#selected_game";

export interface SquadResponse {
  start_time: number;
  batters: PlayersInfo[];
  bowlers: PlayersInfo[];
}

export interface PlayersInfo {
  id: String;
  InPlayingXi: boolean;
  Name: String;
  Role: String[];
  selected: boolean;
}

@Component({
  selector: 'app-submit-squad',
  standalone: true,
  imports: [FormsModule, CommonModule, MainNavbarComponent,
    SquadSelectionNavbarComponent, TimerComponent],
  templateUrl: './submit-squad.component.html',
  styleUrl: './submit-squad.component.css'
})
export class SubmitSquadComponent {

  // redeclared here to be able to use in template
  BATTERS_TAB = BATTERS_TAB;
  BOWLERS_TAB = BOWLERS_TAB;
  BONUS_TAB = BONUS_TAB;
  SUBMIT_TAB = SUBMIT_TAB;

  PICKED_BATTERS_KEY: string = "";
  PICKED_BOWLERS_KEY: string = "";

  game: Game | null = null;
  matchSquad: SquadResponse | null = null;
  startTime: number = 1; // initial value, dont set to 0 
  selectedTab: String = BATTERS_TAB;

  squadForSelection: PlayersInfo[] = [];
  pickedBatters: PlayersInfo[] = [];
  pickedBowlers: PlayersInfo[] = [];
  pickedSquad: PlayersInfo[] = [];
  pickedCaptain: PlayersInfo | null = null; 
  pickedViceCaptain: PlayersInfo | null = null;

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.getGameInfo();
    this.getMatchSquadFromAPI();
  }


  // ------------------- Template Binds ----------------------// 
  onSelectionChange(player: PlayersInfo, event: Event) {
    if (this.selectedTab == BATTERS_TAB) {
      this.pickedBatters = this.matchSquad!.batters.filter(item => item.selected);
    } else {
      this.pickedBowlers = this.matchSquad!.bowlers.filter(item => item.selected);
    }
    this.savePickedSquad();
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab; // Update the selected tab 
    if (this.selectedTab == BATTERS_TAB) {
      this.squadForSelection = this.matchSquad!.batters;
    } else if (this.selectedTab == BOWLERS_TAB) {
      this.squadForSelection = this.matchSquad!.bowlers;
    } else if (this.selectedTab == BONUS_TAB) {
      this.pickedSquad = this.pickedBatters.concat(this.pickedBowlers); 
      this.pickedCaptain = this.pickedSquad[0]; 
      this.pickedViceCaptain = this.pickedBatters[1];
    }
    this.loadFromStorage();
  }

  CheckDisableLogic(): boolean {
    return (this.selectedTab == BATTERS_TAB && this.pickedBatters.length >= 7) ||
      (this.selectedTab == BOWLERS_TAB && this.pickedBowlers.length >= 7) ||
      (this.pickedBatters.length + this.pickedBowlers.length >= 11)
  }

  // ------------------- auxiliary methods::startup ----------------------//  
  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
    if (this.game != null) {
      this.PICKED_BATTERS_KEY = this.game.id + "#" + "PICKED_BATTERS";
      this.PICKED_BOWLERS_KEY = this.game.id + "#" + "PICKED_BOWLERS";
    }
  }

  getMatchSquadFromAPI() {
    if (this.game != null && this.game.id != null) {
      this.fantasyRankingService.getMatchSquad(this.game.id).subscribe(response => {
        if (response) {
          this.matchSquad = response;
          this.startTime = this.matchSquad!.start_time;
          this.squadForSelection = this.matchSquad!.batters;
          this.loadFromStorage();
        }
      });
    }
  }

  // -------------------------- auxiliary methods::local storage --------------------//
  savePickedSquad() {
    localStorage.setItem(this.PICKED_BATTERS_KEY, JSON.stringify(this.pickedBatters));
    localStorage.setItem(this.PICKED_BOWLERS_KEY, JSON.stringify(this.pickedBowlers));
  }

  loadFromStorage() {
    this.pickedBatters = localStorage.getItem(this.PICKED_BATTERS_KEY) ? JSON.parse(localStorage[this.PICKED_BATTERS_KEY]!) : [];
    this.pickedBowlers = localStorage.getItem(this.PICKED_BOWLERS_KEY) ? JSON.parse(localStorage[this.PICKED_BOWLERS_KEY]!) : [];

    let fullSquad: PlayersInfo[] = this.pickedBatters.concat(this.pickedBowlers);

    // check the picked player in the UI
    for (let i = 0; i < fullSquad.length; i++) {
      let targetId = fullSquad[i].id;
      this.squadForSelection;
      let targetIndex = this.squadForSelection.findIndex(player => player.id == targetId);
      console.log(targetIndex);
      if (targetIndex >= 0 && targetIndex <= 11) {
        this.squadForSelection[targetIndex].selected = true;
      }
    }
  }

  // -------------------------- auxiliary methods::user squad collection --------------------// 

  // TODO: at startup if user is authenticated, call api to get their squad for this game 
  // if squad found, overrwrite local storage with this data



  // -------------------------- auxiliary methods::submit data --------------------// 
  // TODO: if user is not authenticated: save last visited url in local storage, add logic to main navbar 
  // TODO: overrwrite local storage data 
  // call api

} // end of class
