import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

import { FantasyRankingService } from '../services/fantasy-ranking.service';

@Component({
  selector: 'app-fantasy-ranking',
  standalone: true,
  imports: [],
  templateUrl: './fantasy-ranking.component.html',
  styleUrl: './fantasy-ranking.component.css'
})
export class FantasyRankingComponent {

  apiResponse: any;

  constructor(private fantasyRankingService: FantasyRankingService) { } 

  ngOnInit(){ 
    this.fantasyRankingService.getFantasyRanking('1375842').subscribe(response => { 
      if (response){ 
        console.log(response); 
      }
    });
  }

}
