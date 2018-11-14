import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {CommentComponent} from './comment/comment.component';
import {CategoriesComponent} from './categories/categories.component';
import {Code404Component} from './code404/code404.component';
import {LoginComponent} from './login/login.component';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {MediaListComponent} from './media/media-list/media-list.component';
import {TagComponent} from './tag/tag.component';
import {AuthGuard} from './auth/auth.guard';
import {MainComponent} from './main/main.component';
import {SettingComponent} from './setting/setting.component';

const router: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
      {path: 'posts', component: PostListComponent, data: {title: 'Posts'}},
      {path: 'post/new', component: PostEditComponent, data: {title: 'Create Post'}},
      {path: 'post/edit', component: PostEditComponent, data: {title: 'Edit Post'}},
      {path: 'medias', component: MediaListComponent, data: {title: 'Medias'}},
      {path: 'comments', component: CommentComponent, data: {title: 'Comments'}},
      {path: 'categories', component: CategoriesComponent, data: {title: 'Categories'}},
      {path: 'tags', component: TagComponent, data: {title: 'Tags'}},
      {path: 'setting', component: SettingComponent, data: {title: 'Setting'}}
    ]
  },
  {path: '**', component: Code404Component}
];

export const appRouting = RouterModule.forRoot(router);
