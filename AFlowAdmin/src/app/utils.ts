import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';

export class Utils {

  static handleError = (error: HttpErrorResponse) => {
    let errorMsg;
    if (error.error instanceof ErrorEvent) {
      errorMsg = `错误：${error.error.message}`;
    } else {
      errorMsg = error.error.message ? error.error.message : error.error;
    }
    return throwError(errorMsg);
  }
}
