import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {MediaService} from '../media.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css'],
  providers: [MediaService]
})
export class MediaListComponent implements OnInit {
  fileList: Array<any> = [];

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.getFileList();
  }


  getFileList() {
    this.mediaService.getMediaList(1, 10)
      .subscribe(
        data => {
          this.fileList = data.list;
        },
        error => console.log(error)
      )
    ;
  }

}
