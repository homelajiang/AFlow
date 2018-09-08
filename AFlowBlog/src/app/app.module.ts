import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DrawerComponent } from './drawer/drawer.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { MediaAddComponent } from './media/media-add/media-add.component';
import { MediaListComponent } from './media/media-list/media-list.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostListComponent } from './post/post-list/post-list.component';
import { CommentComponent } from './comment/comment.component';
import { TagComponent } from './tag/tag.component';
import { CategoriesComponent } from './categories/categories.component';
import {appRouting} from './app.router';
import { WorkbenchComponent } from './workbench/workbench.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DrawerComponent,
    ContentComponent,
    LoginComponent,
    MediaAddComponent,
    MediaListComponent,
    PostEditComponent,
    PostListComponent,
    CommentComponent,
    TagComponent,
    CategoriesComponent,
    WorkbenchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    appRouting
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
