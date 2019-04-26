import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // // TODO 权限拦截
    // const authToken = this.auth.getAuthorizationToken();
    // const authReq = req.clone({
    //   headers: req.headers.set('Authorization', authToken)
    // });
    // // Clone the request and set the new header in one step.
    // // const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    // return next.handle(authReq);
    return next.handle(req);
  }
}
