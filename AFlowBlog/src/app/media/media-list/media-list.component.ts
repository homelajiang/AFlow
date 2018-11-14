import {Component, OnInit} from '@angular/core';
import {MediaService} from '../media.service';
import {Media, PageModel} from '../../app.component';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  private page = 1;
  uploadVisible;

  medias: Media[] = [];

  constructor(private mediaService: MediaService,
              private message: NzMessageService,
              private msg: NzMessageService) {
  }

  // tslint:disable-next-line:typedef
  handleChange({file, fileList}): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }

  ngOnInit() {
    console.log('onInit');
    this.mediaService.getMedias(this.page)
      .subscribe((pageMedias: PageModel<Media>) => {
          this.medias = this.medias.concat(pageMedias.list);
        },
        (err) => {
          this.message.create('error', err);
        }
      );

  }

  showUpload() {
    this.uploadVisible = true;
  }

  closeUpload() {
    this.uploadVisible = false;
  }

}
