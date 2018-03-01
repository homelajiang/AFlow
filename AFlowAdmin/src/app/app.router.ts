import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {WorkbenchComponent} from './workbench/workbench.component';
import {BlogsComponent} from './blog/blogs/blogs.component';
import {EditBlogComponent} from './blog/edit/edit.component';
import {TagsComponent} from './blog/tags/tags.component';
import {CommentsComponent} from './blog/comments/comments.component';
import {MediaListComponent} from './media/media-list/media-list.component';
import {MediaAddComponent} from './media/media-add/media-add.component';
import {CategoriesComponent} from './blog/categories/categories.component';

const router: Routes = [
  {
    path: '',
    component: WorkbenchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'blogs/add',
    component: EditBlogComponent
  },
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'comments',
    component: CommentsComponent
  },
  {
    path: 'medias',
    component: MediaListComponent
  },
  {
    path: 'medias/add',
    component: MediaAddComponent
  }
];

export const appRouting = RouterModule.forRoot(router);
