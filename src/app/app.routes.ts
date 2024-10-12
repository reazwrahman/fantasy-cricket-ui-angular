import { Routes } from '@angular/router'; 
import { FantasyRankingComponent } from './fantasy-ranking/fantasy-ranking.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: FantasyRankingComponent }, 
    { path: 'fantasy-ranking', component: FantasyRankingComponent }
  ];
  
