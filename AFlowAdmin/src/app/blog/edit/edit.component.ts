import {Component, OnInit} from '@angular/core';
import {Post} from '../../app.component';

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
    alert('saved');
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
