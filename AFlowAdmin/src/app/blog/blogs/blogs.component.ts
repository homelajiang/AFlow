import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog.service';
import {Post} from '../../app.component';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  providers: [BlogService]
})
export class BlogsComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs(1, 10)
      .subscribe(data => {
          this.posts = data.list;
        },
        error => console.log(error)
      );
  }

}
