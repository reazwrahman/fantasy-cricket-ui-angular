import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyRankingService } from '../services/fantasy-ranking.service';

interface Ranking {
  id: string;
  medal?: string;
  name: string;
  rank: string;
  score: number;
}

interface RankingData {
  lastUpdated: string;
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

  rankingData: RankingData | null = null;

  constructor(private fantasyRankingService: FantasyRankingService) { } 

  ngOnInit(){ 
    this.fetchRankingData(); 

    // this.fantasyRankingService.getPointsSummary('1375842', 'c5a19035-2c68-4ca0-aec9-5455b215d03e', 'TestUser').subscribe(response => { 
    //   if (response){ 
    //     console.log(response); 
    //   }
    // });
  } 

  fetchRankingData():void{  
    this.fantasyRankingService.getFantasyRanking('1375842').subscribe(response => { 
      if (response){ 
        this.rankingData = response; 
        console.log(this.rankingData);
      }
    }); 

  }

}
