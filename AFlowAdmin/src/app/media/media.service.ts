import {Injectable} from '@angular/core';
import {Media, PageModel, Profile} from '../app.component';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Utils} from '../utils';
import {catchError, tap} from 'rxjs/operators';

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

  getMedias(page: number, keyword?: string): Observable<PageModel<Media>> {
    let p: HttpParams = new HttpParams()
      .set('pageSize', '20')
      .set('pageNum', page.toString());
    if (keyword && keyword.trim()) {
      p = p.set('keyword', keyword.trim());
    }
    return this.http.get<PageModel<Media>>('api/v1/file', {params: p})
      .pipe(
        catchError(Utils.handleError)
      );
  }

  updateMedia(id: string, media: Media): Observable<Media> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const reqBody = {};
    if (media.name || media.name === '') {
      reqBody['name'] = media.name;
    }
    if (media.description || media.description === '') {
      reqBody['description'] = media.description;
    }

    return this.http
      .post<Media>(`api/v1/file/${id}`,
        reqBody, httpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  deleteMedia(id: string): Observable<{}> {
    return this.http.delete(`api/v1/file/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }


}
