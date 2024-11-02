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
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarComponent
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  oldPassword: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.alertError("You have to be logged in to access this page");
      this.router.navigate(['auth/login']);
    }
  }

  changePassword(): void {
    if (this.oldPassword === this.newPassword) {
      this.alertError("New password can't be same as old password");
      return;
    }

    if (this.newPassword === this.confirmPassword) {
      this.authService.changePassword(this.oldPassword, this.newPassword).subscribe(
        (response) => {
          this.alertSuccess("Password Updated!");
          this.authService.logout();
          this.router.navigate(['auth/login']);
        },
        (error) => {
          let errorMessage = error.error?.error || 'Something went wrong. Please try again.';
          this.alertError(errorMessage);
        });
    } else {
      this.alertError("Passwords don't match");
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
