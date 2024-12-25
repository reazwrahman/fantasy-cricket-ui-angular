import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// local imports
import { UserInfo, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {

  username: string = "";

  constructor(private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.onInitAction();
  }

  // route to unconfirmed if applicable
  onInitAction() { 
    console.log(this.username);
    if (this.authService.isUserLoggedIn()) {

      let userInfo: UserInfo | null = this.authService.getUserInfo();
      if (userInfo) {
        this.username = userInfo.username;
      }

      if (!this.authService.isUserConfirmed()) {
        this.router.navigate(['auth/unconfirmed']);
      }

      this.authService.refreshTokenIfNecessary();
    }
  }

  isLoggedIn(): boolean {
    let loggedIn: boolean = this.authService.isUserLoggedIn();
    return loggedIn;

  }

  logout() {
    this.authService.logout();
  }

  routeSignIn() {
    this.router.navigate(['auth/login']);
  }

  routeRegister() {
    this.router.navigate(['auth/register']);
  }

  routeRanking() {
    this.router.navigate(['/fantasy-ranking']);
  } 

  routeJoinLeague(){ 
    this.router.navigate(['/squad-selection']);
  }

  routeViewSquad() {
    this.router.navigate(['/view-squad']);
  }

  routeChangeUsername() {
    this.router.navigate(['auth/changeUsername']);
  }

  routeChangePassword() {
    this.router.navigate(['auth/changePassword']);
  } 

}
