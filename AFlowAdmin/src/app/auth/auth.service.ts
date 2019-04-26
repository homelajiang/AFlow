import {Injectable, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Auth, Profile} from '../app.component';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  // store the URL so we can redirect after logging in

  profile: Profile;

  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  // 错误处理
  public handleError(error: HttpErrorResponse) {
    let errorMsg;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `错误：${error.error.message}`;
    } else {
      errorMsg = error.error.message ? error.error.message : error.error;
    }

    if (error.status === 401) {
      // TODO 保存redirectUrl
      // this.authService.redirectUrl = url;
      // this.router.navigate(['/login']);
    }

    return throwError(errorMsg);
  }

  ngOnInit(): void {
  }


  login(username: string, password: string): Observable<Auth> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .post<Auth>('api/v1/signIn',
        {
          username: username,
          password: password
        }, httpOptions)
      .pipe(
        tap((auth: Auth) => {
          if (auth.access_token !== null && auth.access_token !== undefined) {
            localStorage.setItem('access_token', auth.access_token);
          }
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  public loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

}
