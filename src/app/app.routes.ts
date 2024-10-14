import { Routes } from '@angular/router'; 
import { FantasyRankingComponent } from './fantasy-ranking/fantasy-ranking.component'; 
import { PointsSummaryComponent } from './fantasy-ranking/points-summary/points-summary.component';
import { ErrorComponentComponent } from './error-component/error-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: FantasyRankingComponent }, 
    { path: 'fantasy-ranking', component: FantasyRankingComponent }, 
    { path: 'fantasy-ranking/points-summary', component: PointsSummaryComponent}, 
    { path: '**', component:ErrorComponentComponent}
  ];
  
