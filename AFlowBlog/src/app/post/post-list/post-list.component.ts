import {Component, OnInit} from '@angular/core';
import {BlogService} from '../../blog/blog.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {PageModel, Post} from '../../app.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  gridStyle = {
    padding: 0,
    margin: '5px',
    width: '40px',
    height: '40px'
  };

  actionStyle = {
    padding: 0
  };

  page = 1;
  pageSize = 10;
  searchText: string;
  searchType: number = undefined;
  posts = [];
  postCount: number;

  constructor(private blogService: BlogService,
              private toast: NzMessageService, private modalService: NzModalService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getPosts(this.page, this.pageSize, this.searchType, this.searchText)
      .subscribe((postPage: PageModel<Post>) => {
        this.posts = postPage.list;
      }, (err) => {
        this.toast.error(err);
      });
  }

}
