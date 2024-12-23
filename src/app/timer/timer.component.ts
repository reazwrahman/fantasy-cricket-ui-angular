import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  windowIsOpen: boolean = true;
  closedMessage: String = "";
  textColor: string = 'rgb(34, 228, 0)'; // Initial green color

  @Input() targetTimestamp!: number;

  timeRemaining: any = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  private timerInterval: any;

  constructor() { }

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
        this.textColor = 'rgb(255, 48, 21)';
        this.windowIsOpen = false;
        this.closedMessage = "The submission window for this selection is now closed but feel free to experiment with your fantasy squad!"
        clearInterval(this.timerInterval); // Stop timer when time is up
      } else {
        if (difference > 0 && difference < 10) {
          this.textColor = 'rgb(255, 48, 21)';
        } 
        this.windowIsOpen = true;
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
