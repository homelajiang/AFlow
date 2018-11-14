import {Injectable, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Profile} from '../app.component';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  isLoggedIn = false;
  profile: Profile;

  redirectUrl: string;  // store the URL so we can redirect after logging in

  constructor(private http: HttpClient) {
    this.isLoggedIn = true;
    this.profile = new Profile();
    this.profile.id = '5bceea05a7ebdd1938a6fa9d';
    this.profile.username = 'homelajiang';
    this.profile.nickname = 'homelajiang';
    this.profile.gender = 1;
    this.profile.email = '807598374@qq.com';
    this.profile.signature = '我这个人很勤，但是什么都不想写。';
    this.profile.confirmed = false;
    this.profile.lastLoginDate = '2018-10-23 17:29:41';
    this.profile.joinDate = '2018-10-23 17:29:41';
    this.profile.mobile = '12345678945';
    this.profile.status = 0;
    this.profile.role = 0;
  }

  ngOnInit(): void {
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
        tap((profile: Profile) => {
          this.profile = profile;
          this.isLoggedIn = true;
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.isLoggedIn = false;
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
