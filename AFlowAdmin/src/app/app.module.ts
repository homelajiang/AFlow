import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {appRouting} from './app.router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DrawerComponent} from './drawer/drawer.component';
import {StarterComponent} from './starter/starter.component';
import {WorkbenchComponent} from './workbench/workbench.component';
import {BlogsComponent} from './blog/blogs/blogs.component';
import {CommentsComponent} from './blog/comments/comments.component';
import {TagsComponent} from './blog/tags/tags.component';
import {CategoriesComponent} from './blog/categories/categories.component';
import {EditBlogComponent} from './blog/edit/edit.component';
import {MediaAddComponent} from './media/media-add/media-add.component';
import {MediaListComponent} from './media/media-list/media-list.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
    StarterComponent,
    WorkbenchComponent,
    BlogsComponent,
    CommentsComponent,
    TagsComponent,
    CategoriesComponent,
    EditBlogComponent,
    MediaAddComponent,
    MediaListComponent
  ],
  imports: [
    BrowserModule,
    appRouting,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
