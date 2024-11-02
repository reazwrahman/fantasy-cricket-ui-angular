import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { FantasyRankingService } from '../services/fantasy-ranking.service';
import { UserInfo, AuthService } from '../services/auth.service';
import { MainNavbarComponent } from '../main-navbar/main-navbar.component';

export const ACTIVE_GAMES = "active_games";

export interface Game {
  id: string;
  title: string;
  image: string;
  scorecard: string;
}

interface SquadResponse {
  captain: string;
  full_squad: string[];
  result_prediction: string;
  vice_captain: string;
}

@Component({
  selector: 'app-view-squad',
  standalone: true,
  imports: [FormsModule, CommonModule, MainNavbarComponent],
  templateUrl: './view-squad.component.html',
  styleUrl: './view-squad.component.css'
})
export class ViewSquadComponent {

  activeGames: Game[] | null = null;
  userInfo: UserInfo | null = null;
  selectedGame: Game | null = null;
  selectedTitle: string = "";

  squadResponse: SquadResponse | null = null;
  squadFound: boolean = true;

  constructor(private fantasyRankingService: FantasyRankingService,
    private router: Router, private authService: AuthService) { }

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
    let loggedIn: boolean = this.authService.isUserLoggedIn();
    if (!loggedIn) {
      this.showErrorAlert('Please Login', "You have to login to view your squad");
    } else {
      this.fetchSquad();
    }
  }

  showErrorAlert(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text
    })
    this.router.navigate([`auth/login`]);
  }

  fetchSquad(): void {
    let jwt: string = this.authService.getJwt();
    const storedUserInfo: UserInfo | null = this.authService.getUserInfo();

    this.fantasyRankingService.getSquad(jwt, storedUserInfo!.email,
      storedUserInfo!.userId, this.selectedGame!.id).subscribe(
        (response) => {
          this.squadResponse = response;
          this.selectedTitle = this.selectedGame!.title; // update title for html 
          this.squadFound = true;
        },
        (error) => {
          if (error.status === 404) {
            this.squadFound = false;
          }
          if (error.status === 403) {
            this.showErrorAlert("Not Authorized", "You are not authorized to view this squad");
          }
        });
  }

}
