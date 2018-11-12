import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Profile} from '../app.component';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  redirectUrl: string;  // store the URL so we can redirect after logging in

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<Profile> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<Profile>('api/v1/signIn',
        {
          username: username,
          password: password
        }, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `错误：${error.error.message}`;
    } else {
      errorMsg = error.error.message ? error.error.message : error.error;
    }
    return throwError(errorMsg);
  }


}
