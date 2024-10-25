import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

//local imports
import { getApiUrl } from '../config'

const JWT_KEY = "authToken";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router,
    private cookieService: CookieService) { }

  private handleError(error: HttpErrorResponse): Observable<null> {
    console.error('HTTP error:', error); // Log error details
    this.router.navigate(['/server-error']);
    // Return a fallback observable to avoid breaking the app
    return of(null);
  }

  private getRequest(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  login(email: string, password: string): Observable<any> {
    const apiUrl = getApiUrl('login');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  register(email: string, username: string, password: string): Observable<any> {
    const apiUrl = getApiUrl('register');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, username, password };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  confirmUser(email: string, userId: string): Observable<any> {
    const token = this.cookieService.get(JWT_KEY);
    const apiUrl = getApiUrl('confirm');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    const body = { email, user_id: userId }; // Include user_id in the body

    return this.http.post<any>(apiUrl, body, { headers });
  }

  isUserLoggedIn(): boolean {
    const token = this.cookieService.get(JWT_KEY);

    if (!token) {
      return false;  // Token not found
    }

    try {
      const decoded: any = jwtDecode(token);  // Decode the JWT
      const exp = decoded.exp;  // Get expiration timestamp (in seconds)
      const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds

      const timeRemaining = exp - currentTime;  // Time remaining until expiration

      // Check if token is valid for more than 1 minute (60 seconds)
      return timeRemaining > 60;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return false;  // Invalid token format
    }
  }

}// end of class
