import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {MediaFile, PageModel} from '../app.component';

@Injectable()
export class MediaService {


  constructor(private http: HttpClient) {
  }

  getMediaList(pageNum: number, pageSize: number) {
    const Params = new HttpParams();
    Params.set('pageNum', pageNum.toString());
    Params.set('pageSize', pageSize.toString());
    return this.http.get<PageModel<MediaFile>>('/file', {
      params: {
        pageNum: pageNum.toString(),
        pageSize: pageSize.toString()
      }
    });
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
