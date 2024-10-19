import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyRankingService } from '../services/fantasy-ranking.service';

export const ACTIVE_GAMES = "active_games";
export const SELECTED_GAME = "selected_game";
export const SELECTED_USER = "selected_user";

export interface Game {
  id: string;
  title: string;
  image: string;
  scorecard: string;
}

export interface Ranking {
  id: string;
  medal?: string;
  name: string;
  rank: string;
  score: number;
}

interface RankingData {
  last_updated: string;
  rankings: Ranking[];
}


@Component({
  selector: 'app-fantasy-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fantasy-ranking.component.html',
  styleUrl: './fantasy-ranking.component.css'
})
export class FantasyRankingComponent {

  selectedGame: Game | null = null;
  activeGames: Game[] | null = null;
  rankingData: RankingData | null = null;
  selectedUser: Ranking | null = null;

  defaultMessage:string = "Select a game to view ranking";
  rankingIsAvailable: boolean | null = null; // available in the db 
  activeContestants:string[] = [];

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() {
    this.fetchActiveGames();
  }

  fetchRankingData(gameId: string): void {
    this.fantasyRankingService.getFantasyRanking(gameId).subscribe(response => {
      if (response.status === "206") { 
        this.rankingIsAvailable = false;  
        this.defaultMessage = "No ranking available yet, active participants:"
        this.activeContestants = response.data;
      } else { 
        this.rankingIsAvailable = true;
        this.rankingData = response;
      }
    });
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

  selectGame(game: Game) {
    this.selectedGame = game;
    this.rankingData = null;
    this.fetchRankingData(this.selectedGame.id);
  }

  viewDetails(row: Ranking) {
    if (row) {
      this.selectedUser = row;
      delete this.selectedUser.medal;
      sessionStorage.setItem(SELECTED_GAME, JSON.stringify(this.selectedGame));
      sessionStorage.setItem(SELECTED_USER, JSON.stringify(this.selectedUser));

      this.router.navigate([`/fantasy-ranking/points-summary`]);
    }
  }

}
