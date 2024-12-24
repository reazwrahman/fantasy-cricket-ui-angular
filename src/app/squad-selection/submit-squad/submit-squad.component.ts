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
  predictions: PredictionInfo[];
}

export interface PlayersInfo {
  id: String;
  InPlayingXi: boolean;
  Name: String;
  Role: String[];
  selected: boolean;
}

export interface PredictionInfo {
  id: string;
  val: string
}

export interface LocalStorageData {
  pickedBatters: PlayersInfo[] | [];
  pickedBowlers: PlayersInfo[] | [];
  pickedSquad: PlayersInfo[] | [];

  pickedCaptain: PlayersInfo | null;
  pickedViceCaptain: PlayersInfo | null;
  pickedPrediction: PredictionInfo | null;
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

  LOCAL_STORAGE_KEY: string = ""; // key used to set/get item from local storage

  game: Game | null = null;
  matchSquad: SquadResponse | null = null;
  startTime: number = 1; // initial value, dont set to 0 
  predictionsAvailable: PredictionInfo[] | null = null;
  selectedTab: String = BATTERS_TAB;

  squadForSelection: PlayersInfo[] = []; // all the available players for selection
  pickedBatters: PlayersInfo[] = [];
  pickedBowlers: PlayersInfo[] = [];
  pickedSquad: PlayersInfo[] = []
  pickedCaptain: PlayersInfo | null = null;
  pickedViceCaptain: PlayersInfo | null = null;
  pickedPrediction: PredictionInfo | null = null;

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.getGameInfo();
    this.getMatchSquadFromAPI();
  }


  // ------------------- Template Binds/ UI related ----------------------// 
  onSelectionChange(player: PlayersInfo, event: Event) {
    if (this.selectedTab == BATTERS_TAB) {
      this.pickedBatters = this.matchSquad!.batters.filter(item => item.selected);
    } else {
      this.pickedBowlers = this.matchSquad!.bowlers.filter(item => item.selected);
    }
    this.pickedSquad = this.pickedBatters.concat(this.pickedBowlers);

    // set default value for the other options, if none is picked already 
    this.pickedCaptain = (this.pickedCaptain == null) ? this.pickedSquad[0] : this.pickedCaptain;
    this.pickedViceCaptain = (this.pickedViceCaptain == null) ? this.pickedSquad[1] : this.pickedViceCaptain;
    this.pickedPrediction = (this.pickedPrediction == null && this.predictionsAvailable != null)? this.predictionsAvailable[0] : null;
    

    this.writeToStorage();
  }

  onDropdownChange(event:Event){  
    this.writeToStorage();
  }

  onTabSelected(tab: string) {
    this.selectedTab = tab; // Update the selected tab 
    if (this.selectedTab == BATTERS_TAB) {
      this.squadForSelection = this.matchSquad!.batters;

    } else if (this.selectedTab == BOWLERS_TAB) {
      this.squadForSelection = this.matchSquad!.bowlers;

    }
    this.loadFromStorage();
  }

  CheckDisableLogic(): boolean {
    return (this.selectedTab == BATTERS_TAB && this.pickedBatters.length >= 7) ||
      (this.selectedTab == BOWLERS_TAB && this.pickedBowlers.length >= 7) ||
      (this.pickedBatters.length + this.pickedBowlers.length >= 11)
  }

  fillPlayerCheckboxes() {
    let fullSquad: PlayersInfo[] = this.pickedBatters.concat(this.pickedBowlers);
    // check the picked player in the UI
    for (let i = 0; i < fullSquad.length; i++) {
      let targetIndex = this.findIndexFromTargetList(fullSquad[i].id, this.squadForSelection);
      if (targetIndex >= 0 && targetIndex <= 11) {
        this.squadForSelection[targetIndex].selected = true;
      }
    }
  } 

  fillDefaultDropdowns(){
    this.pickedCaptain = this.pickedSquad[this.findIndexFromTargetList(this.pickedCaptain!.id, this.pickedSquad)]; 
    this.pickedViceCaptain = this.pickedSquad[this.findIndexFromTargetList(this.pickedViceCaptain!.id, this.pickedSquad)];
    this.pickedPrediction = this.predictionsAvailable? this.predictionsAvailable[this.findIndexFromTargetList(this.pickedPrediction!.id, this!.predictionsAvailable)]: null;
  }

  // ------------------- auxiliary methods::startup ----------------------//  
  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
    if (this.game != null) {
      this.LOCAL_STORAGE_KEY = this.game.id + "#" + "squad-selection";
    }
  }

  getMatchSquadFromAPI() {
    if (this.game != null && this.game.id != null) {
      this.fantasyRankingService.getMatchSquad(this.game.id).subscribe(response => {
        if (response) {
          this.matchSquad = response;
          this.startTime = this.matchSquad!.start_time;
          this.squadForSelection = this.matchSquad!.batters;
          this.predictionsAvailable = this.matchSquad!.predictions;
          this.loadFromStorage();
        }
      });
    }
  }

  // -------------------------- auxiliary methods::local storage --------------------//
  writeToStorage() {
    let data: LocalStorageData = {
      pickedBatters: this.pickedBatters,
      pickedBowlers: this.pickedBowlers,
      pickedSquad: this.pickedSquad,
      pickedCaptain: this.pickedCaptain,
      pickedViceCaptain: this.pickedViceCaptain,
      pickedPrediction: this.pickedPrediction
    };
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  loadFromStorage() {
    let rawData: string | null = localStorage.getItem(this.LOCAL_STORAGE_KEY);
    const storedData: LocalStorageData = rawData ? JSON.parse(rawData) : {};

    this.pickedBatters = storedData.pickedBatters ? storedData.pickedBatters : [];
    this.pickedBowlers = storedData.pickedBowlers ? storedData.pickedBowlers : [];
    this.pickedSquad = storedData.pickedSquad ? storedData.pickedSquad : [];

    this.pickedCaptain = storedData.pickedCaptain ? storedData.pickedCaptain : null;
    this.pickedViceCaptain = storedData.pickedViceCaptain ? storedData.pickedViceCaptain : null;
    this.pickedPrediction = storedData.pickedPrediction ? storedData.pickedPrediction : null;

    this.fillPlayerCheckboxes(); 
    this.fillDefaultDropdowns();
  }

  // -------------------------- auxiliary methods::user squad collection --------------------// 

  // TODO: at startup if user is authenticated, call api to get their squad for this game 
  // if squad found, overrwrite local storage with this data



  // -------------------------- auxiliary methods::submit data --------------------// 
  // TODO: if user is not authenticated: save last visited url in local storage, add logic to main navbar 
  // TODO: overrwrite local storage data 
  // call api

  // -------------------------- Utility methods  --------------------// 

    // given an id of a player, it will return the corresponding player from the 
    //    provided list. The list could be full squad selection or the picked squad 
    //    e.g:  findIndexFromPlayerList(23, pickedSquad)
    findIndexFromTargetList(uniqueId:String, targetList:PlayersInfo[] | PredictionInfo[]){ 
      return targetList.findIndex(iterator => iterator.id == uniqueId);
    }

} // end of class
