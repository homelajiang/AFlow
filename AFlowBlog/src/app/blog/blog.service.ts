import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Categories, Comment, PageModel, Post, Tag} from '../app.component';
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

  removeComment(id: String): Observable<{}> {
    return this.http.delete(`api/v1/comment/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  updateComment(id: string, comment: any): Observable<Comment> {
    return this.http.post<Comment>(`api/v1/comment/${id}`, comment, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getComments(page: number, pageSize: number, type: string, keyword: string, post: Post): Observable<PageModel<Comment>> {
    let p: HttpParams = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNum', page.toString());

    if (keyword && keyword.trim()) {
      p = p.set('key', keyword.trim());
    }
    if (post && post.id) {
      p = p.set('post_id', post.id);
    }
    if (type === '0' || type === '1' || type === '-1') {
      p = p.set('type', type.toString());
    }

    return this.http.get<PageModel<Comment>>('api/v1/comment', {params: p})
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

  createPost(post): Observable<Post> {
    return this.http.post<Post>('api/v1/post', post, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  removePost(id: string): Observable<{}> {
    return this.http.delete(`api/v1/post/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  updatePost(id: string, post): Observable<Post> {
    return this.http.post<Post>(`api/v1/post/${id}`, post, this.commentHttpOptions)
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getPosts(page: number, pageSize: number, type: string, keyword?: string): Observable<PageModel<Post>> {
    let p: HttpParams = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNum', page.toString());

    if (keyword && keyword.trim()) {
      p = p.set('key', keyword);
    }

    if (type === '0' || type === '1' || type === '-1') {
      p = p.set('type', type);
    }

    return this.http.get<PageModel<Post>>('api/v1/post', {params: p})
      .pipe(
        catchError(Utils.handleError)
      );
  }

  getPostInfo(id: string): Observable<Post> {
    return this.http.get<Post>(`api/v1/post/${id}`)
      .pipe(
        catchError(Utils.handleError)
      );
  }

}
