import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {MediaListComponent} from './media/media-list/media-list.component';
import {PostEditComponent} from './post/post-edit/post-edit.component';
import {PostListComponent} from './post/post-list/post-list.component';
import {CommentComponent} from './comment/comment.component';
import {TagComponent} from './tag/tag.component';
import {CategoriesComponent} from './categories/categories.component';
import {appRouting} from './app.router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PostDashboardComponent} from './post/post-dashboard/post-dashboard.component';
import {CommentDashboardComponent} from './comment/comment-dashboard/comment-dashboard.component';
import {MarkdownComponent} from './markdown/markdown.component';
import {Code404Component} from './code404/code404.component';
import {MainComponent} from './main/main.component';
import {SettingComponent} from './setting/setting.component';
import {ClipboardModule} from 'ngx-clipboard';
import {ViserModule} from 'viser-ng';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MediaListComponent,
    PostEditComponent,
    PostListComponent,
    CommentComponent,
    TagComponent,
    CategoriesComponent,
    DashboardComponent,
    PostDashboardComponent,
    CommentDashboardComponent,
    MarkdownComponent,
    Code404Component,
    MainComponent,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    appRouting,
    ClipboardModule,
    ViserModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
