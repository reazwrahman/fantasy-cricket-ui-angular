import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  
  targetTimestamp: number = 1798048106000; // Input timestamp in milliseconds
  timeRemaining: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  private timerInterval: any;

  constructor() {}

  ngOnInit(): void {
    if (this.targetTimestamp > 0) {
      this.startTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startTimer(): void {
    this.timerInterval = setInterval(() => {
      const currentTime = Date.now();
      const difference = this.targetTimestamp - currentTime;
      
      if (difference <= 0) {
        clearInterval(this.timerInterval); // Stop timer when time is up
      } else {
        this.calculateTime(difference);
      }
    }, 1000); // Update every second
  }

  calculateTime(difference: number): void {
    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    this.timeRemaining = {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }
}
