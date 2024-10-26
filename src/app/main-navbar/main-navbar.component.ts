import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

// local imports
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.css'
})
export class MainNavbarComponent {


  constructor(private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  isLoggedIn():boolean { 
    let loggedIn:boolean =  this.authService.isUserLoggedIn(); 
    console.log("logged in? "+ loggedIn);
    return loggedIn;

  } 

  logout(){ 

  }

}
