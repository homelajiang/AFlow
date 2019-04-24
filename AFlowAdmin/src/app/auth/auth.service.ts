import {Injectable, OnInit} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Profile} from '../app.component';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {routerNgProbeToken} from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  // store the URL so we can redirect after logging in

  isLoggedIn = false;
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
          this.saveProfile(profile);
        }),
        catchError(this.handleError)
      );
  }

  logout(): void {
    this.removeProfile();
  }

  // 保存profile
  saveProfile(profile: Profile): void {
    console.log('init');
    if (profile === null) {
      return;
    }
    sessionStorage.setItem('profile', JSON.stringify(profile));
    this.profile = profile;
    this.isLoggedIn = true;
  }

  // 移除profile
  removeProfile(): void {
    this.profile = null;
    this.isLoggedIn = false;
    sessionStorage.removeItem('profile');
  }

  // 初始化登陆状态
  initLoginStatus() {
    this.profile = JSON.parse(sessionStorage.getItem('profile'));
    if (this.profile != null) {
      this.isLoggedIn = true;
    }
  }
}
