import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AFlowBlog';
  isCollapsed = false;
  triggerTemplate = null;
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  /** custom trigger can be TemplateRef **/
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}

export interface PageModel<T> {
  hasNextPage: boolean;
  pageSize: number;
  pageNum: number;
  count: number;
  list: Array<T>;
}

export class Media {
  id: string;
  name: string;
  path: string;
  description: string;
  mimetype: string;
  create_date: string;
  modify_date: string;
}

export class Profile {
  id: string;
  username: string;
  nickname: string;
  userImg: string;
  gender: number;
  email: string;
  signature: string;
  confirmed: boolean;
  lastLoginDate: string;
  joinDate: string;
  mobile: string;
  status: number;
  role: number;
}

export class Tag {
  id: string;
  name: string;
  alias: string;
  image: string;
  description: string;
  color: string;
}

export class Categories {
  id: string;
  name: string;
  alias: string;
  image: string;
  description: string;
}

export class Post {
  id: string;
  title: string;
  description: string;
  content: string;
  create_date: string;
  modify_date: string;
  cover: string;
  open: number;
  password: string;
  open_comment: boolean;
  need_review: boolean;
  status: boolean;
  categories: Categories;
  tags: Array<Tag>;
}
