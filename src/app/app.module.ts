import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

// EDITOR OPTIONS
import { CKEditorModule } from 'ngx-ckeditor';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { SidenavModule } from './main/sidenav/sidenav.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from './services/auth-guard.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ExploreComponent } from './explore/explore.component';
import { WorksComponent } from './repositories/works/works.component';
import { ExploreItemsComponent } from './explore/explore-items/explore-items.component';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DocumentPreviewComponent } from './explore/document-preview/document-preview.component';
import { DocumentContentComponent } from './explore/document-preview/document-content/document-content.component';
import { WorksItemsComponent } from './repositories/works/works-items/works-items.component';
import { ExploreContentComponent } from './explore/explore-content/explore-content.component';
import { WorkPreviewComponent } from './repositories/work-preview/work-preview.component';
import { RepositoriesComponent } from './repositories/repositories.component';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    BookmarksComponent,
    DocumentPreviewComponent,
    DocumentContentComponent,
    ExploreComponent,
    ExploreItemsComponent,
    ExploreContentComponent,
    LoginComponent,
    SignupComponent,
    WorksComponent,
    WorksItemsComponent,
    WorkPreviewComponent,
    RepositoriesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    PasswordStrengthMeterModule,
    HttpClientModule,
    SidenavModule,
    BrowserAnimationsModule, // required animations module
    CKEditorModule,
    AngularEditorModule,
    NgxEditorModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
