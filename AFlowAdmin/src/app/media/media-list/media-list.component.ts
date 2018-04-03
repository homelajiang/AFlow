///<reference path="../../../../node_modules/mdui/types/mdui.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpEventType} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {MediaService} from '../media.service';
import {MediaFile, PageModel} from '../../app.component';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css'],
  providers: [MediaService]
})
export class MediaListComponent implements OnInit {
  public fileList: Array<any> = [];
  public pageModel: PageModel<MediaFile>;
  public pageNum = 1;
  public pageSize = 10;
  public canLoadMore = false;
  public loadMoreStatusText = '加载更多';

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    this.getFileList();
  }


  getFileList() {
    this.mediaService.getMediaList(this.pageNum, this.pageSize)
      .subscribe(
        data => {
          this.pageModel = data;
          this.fileList = data.list;
        },
        error => console.log(error)
      )
    ;
  }

  copyPath() {
    mdui.snackbar({message: '已复制'});
  }

  deleteImg(image: MediaFile) {
    mdui.snackbar({message: '已删除'});
  }

  loadMore() {

  }
}
