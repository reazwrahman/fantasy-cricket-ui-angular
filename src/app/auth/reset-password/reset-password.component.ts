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
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MainNavbarComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {

  token: string | null = '';
  email: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(private route: ActivatedRoute, private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    // Read the token from the query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Token:', this.token);
  }

  sendInstruction() {
    if (!this.authService.validateEmail(this.email)) { return; }
    this.authService.sendResetInstruction(this.email).subscribe(
      (response) => {
        let message: string = 'An email has been sent with reset instruction, make sure to check spam as well';
        this.alertSuccess(message);
        this.router.navigate(['/home']);
      },
      (error) => {
        let errorMessage = error.error?.error || 'Something went wrong. Please try again.';
        this.alertError(errorMessage);
      });

  }

  resetPassword() {
    if (this.newPassword === this.confirmPassword && this.token) {
      this.authService.resetPassword(this.token, this.confirmPassword).subscribe(
        (response) => {
          this.alertSuccess("Password Updated!");
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


} // end of class

