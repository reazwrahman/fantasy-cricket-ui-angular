import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// manually  npm-installed modules
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

// local imports
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  email: string = "";
  username: string = "";
  password: string = "";
  confirmedPassword: string = "";

  constructor(private authService: AuthService,
    private router: Router, private cookieService: CookieService) { }

  onRegister() {
    if (this.matchPassword()) {
      this.register()
    };


  }

  matchPassword(): boolean {
    if (this.password !== this.confirmedPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Passwords do not match",
        confirmButtonText: 'Try Again',

      })
      return false;
    }
    else {
      return true;
    }

  }

  register() {
    this.authService.register(this.email, this.username, this.password).subscribe( 
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: "Please login here to complete the registration",
          timer: 1500,
          showConfirmButton: false,
        });
        this.router.navigate(['auth/login']); // Navigate to login or another page
      },
      (error) => {
        let errorMessage = 'Something went wrong. Please try again.';
        
        // Extracting the error message from the response body
        if (error.status === 400 && error.error?.error) {
          errorMessage = error.error.error;
        } else if (error.status === 500) {
          errorMessage = 'Something went wrong on our end, please try again in a few minutes.';
        }
  
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: errorMessage,
          confirmButtonText: 'Try Again',
        });
        console.error('Registration failed:', error);
      }
    );
  }
  



}
