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


export const ACTIVE_GAMES = "active_games";
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
  Role:String[]; 
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

  game: Game | null = null;
  matchSquad: SquadResponse | null = null;
  startTime: number = 1; // initial value, dont set to 0

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.getGameInfo();
    this.getMatchSquad();
  }

  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
  }

  getMatchSquad() {
    if (this.game != null && this.game.id != null) {
      this.fantasyRankingService.getMatchSquad(this.game.id).subscribe(response => {
        if (response) {
          this.matchSquad = response;
          this.startTime = this.matchSquad!.start_time; 
          console.log(this.matchSquad?.batters[0].Name);
        }
      });
    }
  }
} // end of class
