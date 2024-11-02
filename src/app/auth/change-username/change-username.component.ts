import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavbarComponent } from '../../main-navbar/main-navbar.component';

// manually  npm-installed modules
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

// local imports
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-username',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarComponent
  ],
  templateUrl: './change-username.component.html',
  styleUrl: './change-username.component.css'
})
export class ChangeUsernameComponent { 

  password: string = "";
  newUsername: string = "";
  confirmUsername: string = "";

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    if (!this.authService.isUserLoggedIn()) {
      this.alertError("You have to be logged in to access this page");
      this.router.navigate(['auth/login']);
    }
  }

  changeUsername():void {
    if (this.newUsername === this.confirmUsername) {
      this.authService.changeUsername(this.password, this.newUsername).subscribe(
        (response) => {
          this.alertSuccess(response.success); 
          this.authService.logout();
          this.router.navigate(['auth/login']);
        },
        (error) => {
          let errorMessage = error.error?.error || 'Something went wrong. Please try again.';
          this.alertError(errorMessage);
        });
    } else {
      this.alertError("Usernames must match");
    }
  }

  alertSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Successful',
      text: message,
      timer: 15000,
      showConfirmButton: true,
    });
  }

  alertError(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Try Again',
    });
  }

}
