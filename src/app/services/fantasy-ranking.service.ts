import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


//local imports
import { getApiUrl } from '../config'

@Injectable({
  providedIn: 'root' // Makes the service available throughout the app
})
export class FantasyRankingService {

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

  getActiveGames(): Observable<any> {
    const apiUrl = getApiUrl('activeGames');
    return this.getRequest(apiUrl);
  }

  getFantasyRanking(matchId: string): Observable<any> {
    const apiUrl = getApiUrl('fantasyRanking', { matchId });
    return this.getRequest(apiUrl);
  }

  getPointsSummary(matchId: string, userId: string, userName: string): Observable<any> {
    const apiUrl = getApiUrl('pointsSummary', { matchId, userId, userName });
    return this.getRequest(apiUrl);
  }

  getPointsDetails(matchId: string, userId: string, userName: string): Observable<any> {
    const apiUrl = getApiUrl('pointsDetails', { matchId, userId, userName });
    return this.getRequest(apiUrl);
  }

  // view my squad
  getSquad(token: string, email: string, userId: string, matchId: string): Observable<any> {
    const apiUrl = getApiUrl('viewSquad');
    const payload = {
      email: email,
      user_id: userId,
      match_id: matchId
    };

    const headers = { 'Authorization': token };

    return this.http.post(apiUrl, payload, { headers });
  }
}
