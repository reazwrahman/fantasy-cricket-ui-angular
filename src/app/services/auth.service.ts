import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


//local imports
import { getApiUrl } from '../config'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

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

}
