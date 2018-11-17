import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Categories, Media, PageModel} from '../app.component';
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
}
