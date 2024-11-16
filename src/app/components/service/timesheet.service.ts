import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

 
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}
  private getToken(): string {
    // Retrieve your token from local storage or another source
    return localStorage.getItem('authToken') || '';
  }
  getAllCollaborators(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any>(`${this.baseUrl}/collaborators/eh`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error);
  }

  getTimesheetsByCollaboratorId(collaboratorId: number, date: Date): Observable<any> {
    return this.http.get(`${this.baseUrl}/${collaboratorId}?date=${date}`);
  }
}