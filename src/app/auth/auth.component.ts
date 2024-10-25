import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// manually  npm-installed modules
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

// local imports
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  authToken: string | null = null;

  constructor(private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }


  logIn() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false,
        });
        this.router.navigate([`/fantasy-ranking`]);
        this.storeToken(response.token);
        localStorage.setItem("username", response.username);
      },
      (error) => {
        console.error('Login failed:', error);
        const errorMessage = error.error?.message || 'Something went wrong. Please try again.';

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
          confirmButtonText: 'Try Again',

        })
      })
  } 

  storeToken(token: string) {
    this.cookieService.set('authToken', token, { 
      expires: 1, // 1 day
      path: '/',
      secure: true, // Optional, for HTTPS only
      sameSite: 'Lax',
    });
  }

  onLogin() {
    this.logIn();
  } 

  navigateToRegister(){ 
    this.router.navigate(['auth/register']);
  }
}
