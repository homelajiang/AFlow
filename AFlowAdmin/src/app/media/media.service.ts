import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class MediaService {


  constructor(private http: HttpClient) {
  }

  getMediaList(pageNum: number, pageSize: number) {
    return this.http.get<PageModel<MediaFile>>('/file');
  }

  uploadMediaFile(files: FileList) {
    const fileLength = files.length;
    const formData: FormData = new FormData();
    for (let index = 0; index < fileLength; index++) {
      const singleFile = files.item(index);
      // files 这个名字和spring mvc controller参数的名字要对应
      formData.append('file', singleFile);
    }
    const httpOptions = {
      headers:
        new HttpHeaders({
          'Accept': 'application/json'
        })
      // , reportProgress: true
    };
    return this.http.post('/file', formData, httpOptions);
  }

}

export interface PageModel<T> {
  pageSize: number;
  pageNum: number;
  size: number;
  list: Array<T>;
}

export interface MediaFile {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  createDate: string;
  id: string;
}
