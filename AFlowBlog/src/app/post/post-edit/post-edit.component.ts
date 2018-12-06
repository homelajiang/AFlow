import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Categories, PageModel, Post, Tag} from '../../app.component';
import {BlogService} from '../../blog/blog.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef;

  // post = new Post();
  radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px'
  };

  openStatusEditing; // 正在编辑开放状态
  commentStatusEditing; // 正在编辑评论状态
  openStatus = '0'; // 开放状态
  stick: boolean; // 置顶
  postPw: string; // 密码
  commentStatus = '0'; // 评论状态
  needReview: boolean; // 需要审核
  categories: Categories[] = [];
  showCategoriesMenu = false;
  newCategoriesName: string;
  showTagMenu = false;
  newTagValue = '';
  tagInputVisible = false;
  tags: Tag[] = [];
  selectTags: Tag[] = [];
  coverSelected: boolean;
  mdStatus = 0;
  noCategories = new Categories();

  mdOpenText = '公开';
  mdCommentText = '允许评论';

  post: Post;

  constructor(private blogService: BlogService, private toast: NzMessageService,
              private routerInfo: ActivatedRoute) {
    this.noCategories.name = '未分类';
  }

  ngOnInit() {
    // this.mdContent = '## 回复可见的是\n' +
    //   '>引用\n\n* 元\--啦啦--n\n**哇呕**\n```javascript\nfunction(){\nalert("yuan");\n}\n' +
    //   'module.exports = require(\'./lib/marked\');\n' +
    //   'import "com.android.utils.*"' + '\n' +
    //   '```\n' + '$$E=mc^2$$';
    // this.getPostInfo();
    this.post.categories = this.noCategories;

    this.getAllCategories();
    this.getUsedTags();
    const postId = this.routerInfo.snapshot.queryParams['id'];
    if (postId) {
      this.getPostInfo(postId);
    } else {
      this.post = new Post();
    }
  }


  prePost() {

  }

  toggleOpenMenu(status: boolean) {
    this.openStatusEditing = status;
    if (status) {
      this.openStatus = this.post.open.toString();
      this.postPw = this.post.password;
      this.stick = this.post.stick;
    }
  }

  changeOpenStatus() {
    this.post.open = parseInt(this.openStatus, 0);
    this.post.password = this.postPw;
    this.post.stick = this.stick;
    this.openStatusEditing = false;
  }

  toggleCommentMenu(status: boolean) {
    this.commentStatusEditing = status;
    if (status) {
      this.commentStatus = this.post.open_comment.toString() ? '0' : '1';
      this.needReview = this.post.need_review;
    }
  }

  changeCommentStatus() {
    this.post.open_comment = this.commentStatus === '0';
    this.post.need_review = this.needReview;
    this.commentStatusEditing = false;
  }

  toggleCategoriesMenu() {
    this.showCategoriesMenu = !this.showCategoriesMenu;
  }

  createCategories() {

  }

  toggleTagMenu() {
    this.showTagMenu = !this.showTagMenu;
  }

  createTag() {
    // if (this.newTagValue && this.tags.indexOf(this.newTagValue) === -1) {
    //   this.tags.push(this.newTagValue);
    //   // todo 网络添加tag
    // }
    // this.newTagValue = '';
    // this.tagInputVisible = false;
  }

  handleTagClose(removedTag: Tag): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showTagInput(): void {
    this.tagInputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  selectTag(tag: Tag) {
    this.selectTags.push(tag);
  }

  toggleCover() {
    if (this.coverSelected) {
      this.post.cover = '';
    } else {
      // 选择图片
      this.post.cover = 'http://cover.acfunwiki.org/cover.php';
    }
    this.coverSelected = !this.coverSelected;
  }

  setAsDraft() { // 设置为草稿

  }

  showStatusText(status: number) {
    if (status === 0) {
      return '草稿';
    } else if (status > 0) {
      return '已发布';
    } else {
      return '已删除';
    }
  }

  updatePostInfo() {
    if (this.post && this.post.id) {
      this.openStatus = this.post.status.toString();
      this.stick = this.post.stick;
      this.postPw = this.post.password;
      this.commentStatus = this.post.open ? '0' : '1';
      this.needReview = this.post.need_review;
      this.selectTags = this.post.tags;
    }
  }

  getAllCategories() {
    this.blogService.getCategories(1, 100)
      .subscribe((res: PageModel<Categories>) => {
        this.categories = res.list;
      }, (err) => {
        this.toast.error(err);
      });
  }

  getUsedTags() {
    this.blogService.getTags(1, 15)
      .subscribe((res: PageModel<Tag>) => {
        this.tags = res.list;
      }, (err) => {
        this.toast.error(err);
      });
  }

  savePost(publish?: boolean) {
    if (publish) {
      this.post.status = 1;
    }
    console.log(this.post);
  }


  getPostInfo(postId: string) {
    this.blogService.getPostInfo(postId)
      .subscribe((res: Post) => {
        this.post = res;
        this.updatePostInfo();
      }, (err) => {
        this.toast.error(err);
      });

  }

  /*  handleChange(checked: boolean, tag: string): void {
      if (checked) {
        this.selectedTags.push(tag);
      } else {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
      }
      console.log('You are interested in: ', this.selectedTags);
    }*/

}
