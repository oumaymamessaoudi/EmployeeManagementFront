import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TimeEntry } from 'src/app/Models/TimeEntry';
import { OurUser } from 'src/app/Models/OurUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private static BASE_URL = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${UserService.BASE_URL}/auth/login`, { email, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  register(userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${UserService.BASE_URL}/auth/register`, userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getAllUsers(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/admin/get-all-users`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getYourProfile(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/adminuser/get-profile`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getUserById(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/admin/get-users/${userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteUser(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${UserService.BASE_URL}/admin/delete/${userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  updateUser(userId: string, userData: any, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${UserService.BASE_URL}/admin/update/${userId}`, userData, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'ADMIN';
  }
  isCollaborator(): boolean {
    const role = localStorage.getItem('role');
    return role === 'COLLABORATOR';
  }
  isManager(): boolean {
    const role = localStorage.getItem('role');
    return role === 'MANAGER';
  }

  isUser(): boolean {
    const role = localStorage.getItem('role');
    return role === 'USER';
  }

  adminOnly(): boolean {
    return this.isAuthenticated() && this.isAdmin();
  }
  
  collaboratorOnly(): boolean {
    return this.isAuthenticated() && this.isCollaborator();
  }
  managerOnly(): boolean {
    return this.isAuthenticated() && this.isManager();
  }
  private handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${UserService.BASE_URL}/auth/forgot-password`, { email });
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.get<any>(`${UserService.BASE_URL}/auth/check-email-exists?email=${email}`)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  getTimesheetsForUser(userId: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/collaborator/${userId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }
  
  getProjects(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/projects`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getReleases(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/releases`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getActivities(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/activities`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  addTimeEntry(timesheetId: number, timeEntry: TimeEntry): Observable<TimeEntry> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Request Body:', timeEntry);
    console.log('API Endpoint:', `${UserService.BASE_URL}/${timesheetId}/timeEntries`);

    // Ensure heuresTravaillees is a single number
    const requestBody = {
      ...timeEntry,
      heuresTravaillees: timeEntry.heuresTravaillees.reduce((total, hours) => total + hours, 0)
    };
  
    return this.http.post<TimeEntry>(`${UserService.BASE_URL}/${timesheetId}/timeEntries`, requestBody, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getAllCollaborators(token: string): Observable<OurUser[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<OurUser[]>(`${UserService.BASE_URL}/collaborators/eh`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  getTimesheetsByCollaboratorId(collaboratorId: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${UserService.BASE_URL}/timesheet/${collaboratorId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
 
}
