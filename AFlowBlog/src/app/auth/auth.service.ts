import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Profile} from '../app.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http
      .post<Profile>('api/v1/signIn',
        {
          username: username,
          password: password
        }, httpOptions);
  }


}
