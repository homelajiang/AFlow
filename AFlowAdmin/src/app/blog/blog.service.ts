import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {PageModel, Post} from '../app.component';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient) {
  }

  getBlogs(pageNum: number, pageSize: number) {
    const params = new HttpParams();
    params.set('pageSize', String(pageSize));
    params.set('pageNum', String(pageNum));
    return this.http.get<PageModel<Post>>('/post', {
      params: params
    });
  }

  getBlog(id: string) {
    return this.http.get<Post>('/post/' + id);
  }
}
