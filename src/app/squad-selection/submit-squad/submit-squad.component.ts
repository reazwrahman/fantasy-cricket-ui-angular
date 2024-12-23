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

export const ACTIVE_GAMES = "active_games";
export const SELECTED_GAME = "squad-selecton#selected_game";

@Component({
  selector: 'app-submit-squad',
  standalone: true,
  imports: [FormsModule, CommonModule, MainNavbarComponent],
  templateUrl: './submit-squad.component.html',
  styleUrl: './submit-squad.component.css'
})
export class SubmitSquadComponent { 
  
  game: Game | null = null;

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.getGameInfo();
  }


  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
  }
} // end of class
