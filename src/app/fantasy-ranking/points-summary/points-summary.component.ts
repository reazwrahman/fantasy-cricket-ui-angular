import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyRankingService } from '../../services/fantasy-ranking.service';
import { Game, Ranking, SELECTED_GAME, SELECTED_USER } from '../fantasy-ranking.component';
import { NavbarComponent, SUMMARY_TAB } from './navbar/navbar.component'; 
import { PointsDetailsComponent } from './points-details/points-details.component';


export interface PointsSummary {
  game_title: string;
  headings: string[];
  match_prediction: string;
  prediction_bonus: string;
  rows: PlayerRow[];
  total_points: number;
  user_name: string;
}

export type PlayerRow = [
  string,  // Player name with role
  number,  // Batting points
  number,  // Bowling points
  number,  // Fielding points
  number,  // Cap/VC points (can be a float)
  number   // Total points (can be a float)
];

@Component({ 
  selector: 'app-points-summary',
  standalone: true,
  imports: [CommonModule, NavbarComponent, PointsDetailsComponent],
  templateUrl: './points-summary.component.html',
  styleUrl: './points-summary.component.css'
})
export class PointsSummaryComponent {

  game: Game | null = null;
  user: Ranking | null = null; 
  userIcon:string = 'src/assets/user_icon.jpg'; 
  pointsSummary:PointsSummary | null = null;
  selectedTab: string = SUMMARY_TAB; 

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router) { }

  ngOnInit() { 
    this.getGameInfo(); 
    this.getUserInfo(); 
    this.getPointsSummary();

  }

  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
  } 

  getUserInfo() {
    this.user = sessionStorage.getItem(SELECTED_USER) ? JSON.parse(sessionStorage[SELECTED_USER]!) : null;
  } 

  onTabSelected(tab: string) {
    this.selectedTab = tab; // Update the selected tab 
    if(this.selectedTab == SUMMARY_TAB){ 
      this.getPointsSummary();
    } 
    //console.log(this.selectedTab);
  }

  getPointsSummary(){ 
    this.fantasyRankingService.getPointsSummary(this.game!.id, this.user!.id, this.user!.name).subscribe(response => {
      if (response) {
        this.pointsSummary = response;
      }
    }); 
  } 

  goBack(){ 
    this.router.navigate([`/fantasy-ranking`]);
  }

}
