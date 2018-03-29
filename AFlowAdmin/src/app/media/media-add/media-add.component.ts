import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {MediaService} from '../media.service';

@Component({
  selector: 'app-media-add',
  templateUrl: './media-add.component.html',
  styleUrls: ['./media-add.component.css'],
  providers: [MediaService]
})
export class MediaAddComponent implements OnInit {

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
  }

  onSelectFile(event: any) {
    this.mediaService.uploadMediaFile(event.target.files)
      .subscribe(
        data => console.log(data),
        error => console.log(error)
      );
  }

  selectFile(event: any) {
    document.getElementById('selectFile')
      .click();
  }
}
