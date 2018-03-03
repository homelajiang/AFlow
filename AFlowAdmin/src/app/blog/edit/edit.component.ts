import {Component, OnInit} from '@angular/core';
import {Post} from '../../app.component';

// import mdui from 'mdui';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditBlogComponent implements OnInit {

  private post: Post = new Post();

  ngOnInit() {
  }

  save() {
    if (!this.post.title) {
      /*      mdui.snackbar({
              message: '标题不能为空',
              position: 'right-top'
            });*/
    }

  }

  editTitle(event: any) {
    this.post.title = event.target.value;
  }

  editContent(event: any) {
    this.post.md_content = event.target.value;
  }

  publish() {
    alert(JSON.stringify(this.post));
  }

  selectTag() {

  }

  addTag() {

  }

  selectCategory() {

  }

  selectPrivacy() {

  }

  remove() {

  }

  previewBlog() {

  }

  previewContent() {

  }

  fullScreen() {

  }

  exitFullScreen() {
  }


}
