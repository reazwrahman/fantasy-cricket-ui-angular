import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from "jwt-decode";

//local imports
import { getApiUrl } from '../config'
import Swal from 'sweetalert2';

const JWT_KEY = "authToken";
const USER_INFO = "userInfo";

export interface UserInfo {
  username: string;
  email: string;
  userId: string;
}

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

    const body = { email, user_id: userId };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  sendResetInstruction(email: string) {
    const apiUrl = getApiUrl('reset');
    const body = { email: email };

    return this.http.post<any>(apiUrl, body);
  }

  resetPassword(token: string, newPassword: string) {
    const apiUrl = getApiUrl('resetWithToken');
    const body = { new_password: newPassword, token: token };

    return this.http.post<any>(apiUrl, body);
  }

  changePassword(oldPassword: string, newPassword: string) {
    const token = this.cookieService.get(JWT_KEY);
    const apiUrl = getApiUrl('changePassword');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let storedUserInfo: UserInfo | null = this.getUserInfo();

    const body = {
      email: storedUserInfo!.email, user_id: storedUserInfo!.userId,
      old_password: oldPassword, new_password: newPassword
    };

    return this.http.post<any>(apiUrl, body, { headers });
  }


  changeUsername(password: string, newUsername: string) {
    const token = this.cookieService.get(JWT_KEY);
    const apiUrl = getApiUrl('changeUsername');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    let storedUserInfo: UserInfo | null = this.getUserInfo();

    const body = {
      email: storedUserInfo!.email, user_id: storedUserInfo!.userId,
      password: password, new_username: newUsername
    };

    return this.http.post<any>(apiUrl, body, { headers });
  }

  fetchRefreshedToken() {
    const token = this.cookieService.get(JWT_KEY);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });

    const apiUrl = getApiUrl('refreshToken');
    let userInfo: UserInfo | null = this.getUserInfo();
    let email: string = userInfo ? userInfo.email : "";

    const body = {
      email: email
    }
    return this.http.post<any>(apiUrl, body, { headers });
  }


  // ------------- INTERNAL (NO API CALL REQUIRED FOR THE METHODS BELOW) ------//

  getJwt(): string {
    return this.cookieService.get(JWT_KEY);
  }

  isUserLoggedIn(): boolean {
    const token = this.getJwt();

    if (!token) {
      return false;  // Token not found
    }

    // log user out if expires in 60 seconds or less
    return this.readExpiryOnToken(token) > 60
  }

  refreshTokenIfNecessary(): void {
    const token = this.getJwt();
    if (!token) {
      return;  // Token not found
    }
    let expiredInSeconds: number = this.readExpiryOnToken(token);

    if (expiredInSeconds > 0 && expiredInSeconds < 300) {// 5 minutes window 
      this.fetchRefreshedToken().subscribe(
        (response) => {
          this.storeToken(response.token);
        },
        (error) => {
          console.error(error);
        })
    }
  }

  isUserConfirmed(): boolean {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      return Boolean(userInfo.confirmed);
    }
    return false;
  }

  logout() {
    this.router.navigate(['auth/login']);
    localStorage.removeItem(USER_INFO);
    sessionStorage.clear();
    this.deleteCookie(JWT_KEY);
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
  }

  getUserInfo(): UserInfo | null {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      let userInfo: UserInfo = JSON.parse(storedUserInfo);
      return userInfo;
    }
    return null;
  }


  // --------------------------------- utility methods ---------------------------- //  

  readExpiryOnToken(token: string): number {
    try {
      const decoded: any = jwtDecode(token);  // Decode the JWT
      const exp = decoded.exp;  // Get expiration timestamp (in seconds)
      const currentTime = Math.floor(Date.now() / 1000);  // Current time in seconds

      const timeRemaining = exp - currentTime;  // Time remaining until expiration

      return timeRemaining;

    } catch (error) {
      console.error('Error decoding JWT:', error);
      return -1;  // Invalid token format
    }
  } 

  storeToken(token: string) {
    this.cookieService.set('authToken', token, {
      expires: 1, // 1 day
      path: '/',
      secure: true, // Optional, for HTTPS only
      sameSite: 'Lax',
    });
  } 

  validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'The entered email format is invalid',
        confirmButtonText: 'Try Again',
      })
      return false;
    }
    return true;
  }

}// end of class
