import {Injectable} from '@angular/core';
import {Media, PageModel} from '../app.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from '../utils';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getMedias(page: number): Observable<PageModel<Media>> {
    return this.http.get<PageModel<Media>>('api/v1/file')
      .pipe(
        catchError(Utils.handleError)
      );
  }

  // upload():Observable<File>{
  //   return this.http.
  // }

}
