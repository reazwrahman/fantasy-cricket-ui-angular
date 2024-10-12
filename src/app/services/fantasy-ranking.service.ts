import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

//local imports
import {getApiUrl} from '../config'

@Injectable({
  providedIn: 'root' // Makes the service available throughout the app
})
export class FantasyRankingService {

  constructor(private http: HttpClient) { } 

  getFantasyRanking(matchId: string): Observable<any> {
    const apiUrl = getApiUrl('fantasyRanking', { matchId });  // Replace {matchId} in the URL
    return this.http.get(apiUrl);
  } 

  getPointsSummary(matchId: string, userId:string, userName:string): Observable<any> {
    const apiUrl = getApiUrl('pointsSummary', { matchId, userId, userName });  // Replace {matchId} in the URL
    return this.http.get(apiUrl);
  }
}
