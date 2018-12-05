import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Categories, Post, Tag} from '../../app.component';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('inputElement') inputElement: ElementRef;

  // post = new Post();

  openStatusEditing; // 正在编辑开放状态
  commentStatusEditing; // 正在编辑评论状态
  openStatus = '0'; // 开放状态
  stick: boolean; // 置顶
  postPw: string; // 密码
  commentStatus = '0'; // 评论状态
  needReview: boolean; // 需要审核
  categories: Categories[] = [];
  selectCategoriesId: string;
  showCategoriesMenu = false;
  newCategoriesName: string;
  showTagMenu = false;
  newTagValue = '';
  tagInputVisible = false;
  tags: Tag[] = [];
  selectTags: Tag[] = [];
  coverUrl: string;
  coverSelected: boolean;
  mdContent = '';
  mdTitle = '';

  constructor() {
  }

  ngOnInit() {
    this.mdContent = '## 回复可见的是\n' +
      '>引用\n\n* 元\--啦啦--n\n**哇呕**\n```javascript\nfunction(){\nalert("yuan");\n}\n' +
      'module.exports = require(\'./lib/marked\');\n' +
      'import "com.android.utils.*"' + '\n' +
      '```\n' + '$$E=mc^2$$';
  }

  toggleOpenMenu(status: boolean) {
    this.openStatusEditing = status;
  }

  changeOpenStatus() {

  }

  toggleCommentMenu(status: boolean) {
    this.commentStatusEditing = status;
  }

  changeCommentStatus() {

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

  handleTagClose(removedTag: {}): void {
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

    } else {
      // 选择图片
      this.coverUrl = 'http://cover.acfunwiki.org/cover.php';
    }
    this.coverSelected = !this.coverSelected;
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
