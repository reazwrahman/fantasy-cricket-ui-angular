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
import { MainNavbarComponent } from '../../main-navbar/main-navbar.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, 
    MainNavbarComponent
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
        this.handleSucccess(response);
      },
      (error) => {
       this.handleError(error);
      }
    );
  }

  handleSucccess(respose:any){ 
    Swal.fire({
      icon: 'success',
      title: 'Registration Successful',
      text: "A confirmation link has been sent to your email. To generate another link, login first.",
      timer: 15000,
      showConfirmButton: true,
    });
    this.router.navigate(['auth/login']); // Navigate to login or another page 
  } 

  handleError(error:any){ 
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
  



}
