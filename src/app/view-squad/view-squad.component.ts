import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FantasyRankingService } from '../services/fantasy-ranking.service';
import { UserInfo, AuthService } from '../services/auth.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

export const ACTIVE_GAMES = "active_games";

export interface Game {
  id: string;
  title: string;
  image: string;
  scorecard: string;
}

interface SquadResponse {
  captain: string;
  full_squad: string[];
  result_prediction: string;
  vice_captain: string;
}

@Component({
  selector: 'app-view-squad',
  standalone: true,
  imports: [FormsModule, CommonModule, MainNavbarComponent],
  templateUrl: './view-squad.component.html',
  styleUrl: './view-squad.component.css'
})
export class ViewSquadComponent {

  activeGames: Game[] | null = null;
  userInfo: UserInfo | null = null;
  selectedGame: Game | null = null;

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.fetchActiveGames();
    console.log(this.activeGames);
  }

  fetchActiveGames(): void {
    this.activeGames = sessionStorage.getItem(ACTIVE_GAMES) ? JSON.parse(sessionStorage.getItem(ACTIVE_GAMES)!) as Game[] : null;

    if (!this.activeGames) {
      this.fantasyRankingService.getActiveGames().subscribe(response => {
        if (response) {
          this.activeGames = response;
          sessionStorage.setItem(ACTIVE_GAMES, JSON.stringify(this.activeGames));
        }
      });
    }
  } 

  onSelectGame(): void { 
    console.log(this.selectedGame?.title); 
    
  }

  fetchSquad(): void {

  } 


}
