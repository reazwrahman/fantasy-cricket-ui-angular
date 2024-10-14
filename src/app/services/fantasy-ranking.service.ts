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

  getActiveGames(): Observable<any> {
    const apiUrl = getApiUrl('activeGames'); 
    return this.http.get(apiUrl);
  }

  getFantasyRanking(matchId: string): Observable<any> {
    const apiUrl = getApiUrl('fantasyRanking', { matchId }); 
    return this.http.get(apiUrl);
  } 

  getPointsSummary(matchId: string, userId:string, userName:string): Observable<any> {
    const apiUrl = getApiUrl('pointsSummary', { matchId, userId, userName }); 
    return this.http.get(apiUrl);
  }  

  getPointsDetails(matchId: string, userId:string, userName:string): Observable<any> {
    const apiUrl = getApiUrl('pointsDetails', { matchId, userId, userName });  
    return this.http.get(apiUrl);
  } 


}
