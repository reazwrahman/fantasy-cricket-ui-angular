import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FantasyRankingService } from '../services/fantasy-ranking.service';
import { UserInfo } from '../services/auth.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

export const ACTIVE_GAMES = "active_games"; 
export const SELECTED_GAME = "squad-selecton#selected_game";

export interface Game {
  id: string;
  title: string;
  image: string;
  scorecard: string; 
  squad_link: string;
}

@Component({
  selector: 'app-squad-selection',
  standalone: true,
  imports: [FormsModule, CommonModule, MainNavbarComponent],
  templateUrl: './squad-selection.component.html',
  styleUrl: './squad-selection.component.css'
})
export class SquadSelectionComponent {
  activeGames: Game[] | null = null;
  selectedGame: Game | null = null;
  selectedTitle: string = "";

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.fetchActiveGames();
  }

  fetchActiveGames(): void {
    this.activeGames = sessionStorage.getItem(ACTIVE_GAMES) ? JSON.parse(sessionStorage.getItem(ACTIVE_GAMES)!) as Game[] : null;
    if (this.activeGames) {
      this.selectedGame = this.activeGames[0];
    } else {
      this.fantasyRankingService.getActiveGames().subscribe(response => {
        if (response) {
          this.activeGames = response;
          sessionStorage.setItem(ACTIVE_GAMES, JSON.stringify(this.activeGames));
          this.selectedGame = this.activeGames![0];
        }
      });
    }
  } 

  onSelectGame(): void {
    sessionStorage.setItem(SELECTED_GAME, JSON.stringify(this.selectedGame)); 
    this.router.navigate(['squad-selection/submit-squad']);
  }

} 
