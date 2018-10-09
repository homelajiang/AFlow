import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {CommentComponent} from './comment/comment.component';
import {CategoriesComponent} from './categories/categories.component';
import {Code404Component} from './code404/code404.component';

const router: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'posts', component: PostListComponent},
  {path: 'comments', component: CommentComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'tags', component: CategoriesComponent},
  {path: '**', component: Code404Component}
];

export const appRouting = RouterModule.forRoot(router);
