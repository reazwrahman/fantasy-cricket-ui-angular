import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-component',
  standalone: true,
  templateUrl: './error-component.component.html',
  styleUrls: ['./error-component.component.css']
})
export class ErrorComponentComponent implements AfterViewInit {
  @ViewChild('cricketCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  // Load the background image
  background = new Image();
  animationPaused = false; // Track animation pause status

  // Ball properties
  initialBallState = {
    x: 50,  // Starting X position
    y: 170, // Starting Y position (height off ground)
    radius: 8,
    color: 'red',
    vx: 8,  // Horizontal velocity
    vy: -4,  // Initial vertical velocity (upwards)
    gravity: 0.2 // Simulates gravity effect
  };
  ball = { ...this.initialBallState }; // Clone the ball state

  constructor(private router: Router) { }

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.background.src = 'assets/error_component/background.jpg'; // Path to your background image
    this.background.onload = () => {
      this.animate();
    };
    window.addEventListener('resize', () => this.resizeCanvas());
    this.resizeCanvas(); // Set initial canvas size
  }

  // Resize canvas to full window width and height
  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 600;  // Set the width to the window's width
    canvas.height = 300; // Set the height to 40% of the window's height
  }

  // Draw the ball on the canvas
  drawBall() {
    // Draw the red ball
    const gradient = this.ctx.createRadialGradient(this.ball.x - 3, this.ball.y - 3, 3, this.ball.x, this.ball.y, this.ball.radius);
    gradient.addColorStop(0, 'lightcoral');  // Highlight at the top left
    gradient.addColorStop(1, 'darkred');     // Darker red at the edges

    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();

    // Draw the seam (two parallel lines)
    this.ctx.strokeStyle = 'brown';
    this.ctx.lineWidth = 2;

    // First seam arc (upper seam)
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius - 2, 0, Math.PI); // Upper arc
    this.ctx.stroke();
    this.ctx.closePath();

    // Second seam arc (lower seam)
    this.ctx.beginPath();
    this.ctx.arc(this.ball.x, this.ball.y, this.ball.radius - 2, Math.PI, 2 * Math.PI); // Lower arc
    this.ctx.stroke();
    this.ctx.closePath();
  }

  // Update the ball's position and handle physics
  updateBall() {
    this.ball.x += this.ball.vx;      // Update horizontal position
    this.ball.y += this.ball.vy;      // Update vertical position
    this.ball.vy += this.ball.gravity; // Simulate gravity (increase downward velocity)

    // Bounce off the ground (reverse vertical velocity on collision)
    if (this.ball.y + this.ball.radius >= this.canvasRef.nativeElement.height - 80) {
      this.ball.y = this.canvasRef.nativeElement.height - this.ball.radius - 100; // Reset to ground level
      this.ball.vy *= -0.7; // Some energy loss on bounce
    }

    // If the ball moves off the canvas, pause and reset with a delay
    if (this.ball.x - this.ball.radius >= this.canvasRef.nativeElement.width+10 && !this.animationPaused) {
      this.animationPaused = true; // Pause animation to prevent multiple resets
      setTimeout(() => this.resetBall(), 1000); // 1 second delay before resetting
    }
  }

  // Reset the ball to its initial position
  resetBall() {
    this.ball = { ...this.initialBallState }; // Reset the ball state
    this.animationPaused = false; // Resume animation
  }

  // Clear the canvas before each frame
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  // Animation loop to keep the ball moving
  animate() {
    if (!this.animationPaused) {
      this.clearCanvas(); // Clear the canvas
      this.ctx.drawImage(this.background, 0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height); // Draw background
      this.drawBall(); // Draw the ball
      this.updateBall(); // Update the ball's position
    }

    requestAnimationFrame(() => this.animate()); // Loop the animation
  }

  goHome() {
    this.router.navigate([`/home`]);
    console.log('hi');
  }
}
