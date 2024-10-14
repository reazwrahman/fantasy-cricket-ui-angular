import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';

// local imports
import { FantasyRankingService } from '../../../services/fantasy-ranking.service';
import { BATTING_TAB, BOWLING_TAB, FIELDING_TAB } from '../navbar/navbar.component';
import { Game, Ranking, SELECTED_GAME, SELECTED_USER } from '../../fantasy-ranking.component';

// Interface for the batting, bowling, or fielding display data
interface DisplayData {
  headings: string[]; // Array of headings
  rows: string[]; // Array of player rows
  total_points: number; // Total points for the category
}

// Main interface for the entire payload
interface GameData {
  batting_display: DisplayData; // Batting data
  bowling_display: DisplayData; // Bowling data
  fielding_display: DisplayData; // Fielding data
  game_title: string; // Title of the game
  user_name: string; // User name of the player
}

type GameDataMap = {
  [key: string]: DisplayData | null;
};


@Component({
  selector: 'app-points-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './points-details.component.html',
  styleUrl: './points-details.component.css'
})
export class PointsDetailsComponent {

  gameData: GameData | null = null;
  game: Game | null = null;
  user: Ranking | null = null;
  selectedData: DisplayData | null = null;
  gameDataMapped: GameDataMap;

  @Input() tab!: string; // Receives tab value from parent  
  constructor(private fantasyRankingService: FantasyRankingService,
    private cdr: ChangeDetectorRef
  ) {
    this.gameDataMapped = {};
  }

  ngOnInit() { 
    console.log("initializing");
    this.getGameInfo();
    this.getUserInfo();
    this.getPointsBreakdown();
  }

  ngOnChanges(changes: SimpleChanges) { 
    if (changes['tab'] && !changes['tab'].isFirstChange() && this.gameData) {
      console.log('im here');
      this.mapDataToTab();
    }
  }

  getPointsBreakdown() {
    this.fantasyRankingService.getPointsDetails(this.game!.id, this.user!.id, this.user!.name).subscribe(response => {
      if (response) {
        this.gameData = response;
        this.gameDataMapped[BATTING_TAB] = this.gameData!.batting_display;
        this.gameDataMapped[BOWLING_TAB] = this.gameData!.bowling_display;
        this.gameDataMapped[FIELDING_TAB] = this.gameData!.fielding_display;  
        this.mapDataToTab();
      }
    });
  }

  getGameInfo() {
    this.game = sessionStorage.getItem(SELECTED_GAME) ? JSON.parse(sessionStorage[SELECTED_GAME]!) : null;
  }

  getUserInfo() {
    this.user = sessionStorage.getItem(SELECTED_USER) ? JSON.parse(sessionStorage[SELECTED_USER]!) : null;
  } 

  mapDataToTab(){  
    this.selectedData = this.gameDataMapped[this.tab]; 
    this.cdr.detectChanges(); // Ensure the view updates
  }

}
