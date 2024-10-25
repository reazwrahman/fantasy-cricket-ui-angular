import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'unconfirmed-account',
  templateUrl: './unconfirmed.component.html',
  styleUrls: ['./unconfirmed.component.css']
})
export class UnconfirmedComponent implements OnInit {
  username: string = 'Guest'; // Initialize the username

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserName();
  }

  getUserName() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
    }
  }

  resendConfirmation(): void {
    // this.authService.resendConfirmation().subscribe(
    //   (response) => {
    //     alert('A new confirmation email has been sent to your inbox.');
    //   },
    //   (error) => {
    //     alert('Failed to send confirmation email. Please try again.');
    //   }
    // );
  }
}
