import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'unconfirmed-account',
  templateUrl: './unconfirmed.component.html',
  styleUrls: ['./unconfirmed.component.css']
})
export class UnconfirmedComponent implements OnInit {
  username: string = 'Guest'; // Initialize the username 
  email: string = "";
  userId: string = "";

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      this.username = userInfo.username;
      this.email = userInfo.email;
      this.userId = userInfo.userId;
    }
  }

  resendConfirmation(): void {
    if (!this.authService.isUserLoggedIn()) {
      this.checkLoginStatus();
    } else { 
      this.callApi();
    }
  }

  checkLoginStatus() {
    let loggedIn: boolean = this.authService.isUserLoggedIn();
    loggedIn = false;

    if (!loggedIn) {
      Swal.fire({
        icon: 'error',
        title: 'Session Expired',
        text: "Please Login Again"
      })
      this.router.navigate([`auth/login`]);

    }
  }

  callApi() {
    this.authService.confirmUser(this.email, this.userId).subscribe(
      (response) => {
        this.handleSuccess(response);
      },
      (error) => {
        this.handleError(error);
      });
  }

  handleSuccess(response: any) { 
    Swal.fire({
      icon: 'success',
      title: 'Check Email',
      text: 'A confirmation link has been sent to your Email, check spam as well',
      timer: 15000,
      showConfirmButton: true,
    });

  }

  handleError(error: any) { 
    Swal.fire({
      icon: 'error',
      title: 'Something Went Wrong',
      text: "Please Login Again"
    })
    this.router.navigate([`auth/login`]);

  }

}// end of class
