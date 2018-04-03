import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}

export class Post {
  public _id: string;
  public title: string;
  public description: string;
  public content: string;
  public md_content: string;
  public create_date: string;
  public modify_date: string;
  public tags: Tag[];
  public categories: Category;
  public creator: Profile;
  public status: number;
}

export class Profile {
  public _id: string;
  public confirmed: string;
  public username: string;
  public userImg: string;
  public gender: number;
  public email: string;
  public signature: string;
  public lastLoginDate: string;
  public joinDate: string;
  public mobile: string;
  public exp: number;
  public time: number;
}

export class Tag {
  public name: string;
  public image: string;
  public _id: string;

}

export class Category {
  public name: string;
  public image: string;
  public _id: string;
}

export interface MediaFile {
  name: string;
  path: string;
  mimetype: string;
  size: number;
  createDate: string;
  id: string;
}

export interface PageModel<T> {
  firstPage: boolean;
  lastPage: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  pageNum: number;
  size: number;
  list: Array<T>;
}
