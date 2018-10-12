import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {CommentComponent} from './comment/comment.component';
import {CategoriesComponent} from './categories/categories.component';
import {Code404Component} from './code404/code404.component';
import {LoginComponent} from './login/login.component';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {MediaListComponent} from './media/media-list/media-list.component';
import {MediaAddComponent} from './media/media-add/media-add.component';

const router: Routes = [
  {path: '', component: DashboardComponent},
  // {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'post/new', component: PostEditComponent},
  {path: 'post/edit', component: PostEditComponent},
  {path: 'medias', component: MediaListComponent},
  {path: 'media/new', component: MediaAddComponent},
  {path: 'comments', component: CommentComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'tags', component: CategoriesComponent},
  {path: '**', component: Code404Component}
];

export const appRouting = RouterModule.forRoot(router);
