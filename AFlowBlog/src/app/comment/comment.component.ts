import {Component, OnInit} from '@angular/core';
import {BlogService} from '../blog/blog.service';
import {PageModel} from '../app.component';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  searchText: string;
  searchType = '0'; // 0 发布 1 待审核 -1 删除
  pageSize = 10;
  page = 1;
  commentCount = 0;
  currentPage = 1;

  comments = [];

  constructor(private blogService: BlogService, private toast: NzMessageService,) {
  }

  ngOnInit() {
    this.getComments();
  }

  changeType(type) {
    this.searchType = type;
    this.page = 1;
    this.getComments();
  }

  pageSelect(page) {
    this.page = page;
    this.getComments();
  }

  search(text) {
    this.searchText = text;
    this.page = 1;
    this.getComments();
  }


  getComments() {
    this.blogService.getComments(this.page, this.pageSize, this.searchType, this.searchText)
      .subscribe((commentPage: PageModel<Comment>) => {
        this.comments = commentPage.list;
        this.commentCount = commentPage.count;
        this.currentPage = commentPage.pageNum;
      }, (err) => {
        this.toast.error(err);
      });
  }

}
