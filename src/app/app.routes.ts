import { Routes } from '@angular/router';
import { FantasyRankingComponent } from './fantasy-ranking/fantasy-ranking.component';
import { PointsSummaryComponent } from './fantasy-ranking/points-summary/points-summary.component';
import { ErrorComponentComponent } from './error-component/error-component.component';
import { LoginComponent } from './auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component'; 
import { UnconfirmedComponent } from './auth/unconfirmed/unconfirmed.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: FantasyRankingComponent },
  { path: 'fantasy-ranking', component: FantasyRankingComponent },
  { path: 'fantasy-ranking/points-summary', component: PointsSummaryComponent },
  
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegistrationComponent }, 
  { path: 'auth/unconfirmed', component: UnconfirmedComponent}, 

  { path: 'server-error', component: ErrorComponentComponent },
  { path: '**', component: ErrorComponentComponent }
];

