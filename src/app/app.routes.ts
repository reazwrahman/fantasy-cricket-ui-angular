import { Routes } from '@angular/router';

import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { ErrorComponentComponent } from './error-component/error-component.component';

import { FantasyRankingComponent } from './fantasy-ranking/fantasy-ranking.component';
import { PointsSummaryComponent } from './fantasy-ranking/points-summary/points-summary.component';

import { LoginComponent } from './auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { UnconfirmedComponent } from './auth/unconfirmed/unconfirmed.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ChangeUsernameComponent } from './auth/change-username/change-username.component';

import { ViewSquadComponent } from './view-squad/view-squad.component'; 
import { SquadSelectionComponent } from './squad-selection/squad-selection.component';
import { SubmitSquadComponent } from './squad-selection/submit-squad/submit-squad.component';

// TEST (TODO: REMOVE IN FINAL)
import { TestSquadSelectionComponent } from './test-squad-selection/test-squad-selection.component'; 
import { TimerComponent } from './timer/timer.component';  
import { SquadSelectionNavbarComponent } from './squad-selection/squad-selection-navbar/squad-selection-navbar.component'; 

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'navbar', component: MainNavbarComponent },

  { path: 'home', component: FantasyRankingComponent },
  { path: 'fantasy-ranking', component: FantasyRankingComponent },
  { path: 'fantasy-ranking/points-summary', component: PointsSummaryComponent },

  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegistrationComponent },
  { path: 'auth/unconfirmed', component: UnconfirmedComponent },
  { path: 'auth/reset', component: ResetPasswordComponent },
  { path: 'auth/changePassword', component: ChangePasswordComponent}, 
  { path: 'auth/changeUsername', component: ChangeUsernameComponent},

  { path: 'view-squad', component: ViewSquadComponent},  
  { path: 'squad-selection', component: SquadSelectionComponent}, 
  { path: 'squad-selection/submit-squad', component: SubmitSquadComponent},

  // TODO: REMOVE (USED FOR TESTING ONLY)
  { path: 'test-squad', component: TestSquadSelectionComponent},  
  { path: 'timer', component: TimerComponent},   
  { path: 'squad-selection/submit-squad', component: SubmitSquadComponent}, 
  { path: 'squad-selection/navbar', component: SquadSelectionNavbarComponent},

  { path: 'server-error', component: ErrorComponentComponent },
  { path: '**', component: ErrorComponentComponent }
];

