///<reference path="../../../../node_modules/mdui/types/mdui.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {MediaService} from '../media.service';
import {MediaFile} from '../../app.component';

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
    this.mediaService.getMediaList(1, 100)
      .subscribe(
        data => {
          this.fileList = data.list;
        },
        error => console.log(error)
      )
    ;
  }

  copyPath(image: MediaFile) {
    mdui.snackbar({message: '已复制'});
  }

  deleteImg(image: MediaFile) {
    mdui.snackbar({message: '已删除'});
  }
}
