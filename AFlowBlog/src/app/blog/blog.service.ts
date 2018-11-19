import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Categories, Media, PageModel, Tag} from '../app.component';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Utils} from '../utils';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  commentHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }


  createCategories(categories: Categories): Observable<Categories> {
    return this.http.post<Categories>('api/v1/categories', categories, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  removeCategories(id: string): Observable<{}> {
    return this.http.delete(`api/v1/categories/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  updateCategories(id: string, categories: Categories): Observable<Categories> {
    return this.http.post<Categories>(`api/v1/categories/${id}`, categories, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getCategories(page: number, pageSize: number, keyword?: string): Observable<PageModel<Categories>> {
    let p: HttpParams = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNum', page.toString());
    if (keyword && keyword.trim()) {
      p = p.set('key', keyword.trim());
    }
    return this.http.get<PageModel<Categories>>('api/v1/categories', {params: p})
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getCategoriesInfo(id: string): Observable<Categories> {
    return this.http.get<Categories>(`api/v1/categories/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  createTags(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>('api/v1/tag', tag, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  removeTag(id: string): Observable<{}> {
    return this.http.delete(`api/v1/tag/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  updateTag(id: string, tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`api/v1/tag/${id}`, tag, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getTags(page: number, pageSize: number, keyword?: string): Observable<PageModel<Tag>> {
    let p: HttpParams = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNum', page.toString());
    if (keyword && keyword.trim()) {
      p = p.set('key', keyword.trim());
    }
    return this.http.get<PageModel<Tag>>('api/v1/tag', {params: p})
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getTagInfo(id: string): Observable<Tag> {
    return this.http.get<Tag>(`api/v1/tag/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }
}
