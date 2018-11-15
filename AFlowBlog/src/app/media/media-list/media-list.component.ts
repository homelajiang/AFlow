import {Component, OnInit} from '@angular/core';
import {MediaService} from '../media.service';
import {Media, PageModel} from '../../app.component';
import {NzMessageService} from 'ng-zorro-antd';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.css']
})
export class MediaListComponent implements OnInit {

  private page = 1;
  uploadVisible;

  medias: Media[] = [];
  showingMedia: Media = new Media();
  mediaShowing = false;

  mediaUpdate$: Observable<Media>;
  private descriptionText$ = new Subject<string>();

  constructor(private mediaService: MediaService,
              private toast: NzMessageService) {
  }

  ngOnInit() {

    this.mediaUpdate$ = this.descriptionText$.pipe(
      // debounceTime(500),
      distinctUntilChanged(),
      switchMap((desc: string) => {
        const temp = new Media();
        temp.description = desc;
        return this.mediaService.updateMedia(this.showingMedia.id, temp);
      })
    );

    this.mediaUpdate$.subscribe((res: Media) => {
      this.medias.forEach((m: Media, index: number) => {
        if (m.id === res.id) {
          this.medias[index] = res;
          console.log(`index:${index}`);
          return;
        }
      });
    }, err => {
      this.toast.error(`更新失败：${err}`);
    });

    this.mediaService.getMedias(this.page)
      .subscribe((pageMedias: PageModel<Media>) => {
          this.medias = this.medias.concat(pageMedias.list);
        },
        (err) => {
          this.toast.error(err);
        }
      );

  }

  handleChange({file, fileList}): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.toast.success(`${file.name} 上传成功`);
      this.medias.unshift(file.response);
    } else if (status === 'error') {
      this.toast.error(`${file.name} 上传失败`);
    }
  }


  update_description(description: string) {
    console.log(description);
    description = description.trim();
    if (this.showingMedia.description !== description &&
      !(this.showingMedia.description === undefined && description === '')) {
      this.descriptionText$.next(description);
      this.showingMedia.description = description;
    }
  }

  showMediaDetail(media: Media) {
    this.showingMedia = media;
    this.mediaShowing = true;
  }

  closeShowMedia() {
    this.mediaShowing = false;
  }

  showUpload() {
    this.uploadVisible = true;
  }

  closeUpload() {
    this.uploadVisible = false;
  }

}
