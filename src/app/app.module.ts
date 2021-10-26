import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ExploreComponent } from './explore/explore.component';
import { WorksComponent } from './works/works.component';
import { HttpClientModule } from '@angular/common/http';
import { ExploreItemsComponent } from './explore/explore-items/explore-items.component';
import { SidenavModule } from './main/sidenav/sidenav.module';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
import { DocumentPreviewComponent } from './explore/document-preview/document-preview.component';
import { DocumentContentComponent } from './explore/document-preview/document-content/document-content.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ExploreComponent,
    WorksComponent,
    ExploreItemsComponent,
    BookmarksComponent,
    DocumentPreviewComponent,
    DocumentContentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    PasswordStrengthMeterModule,
    HttpClientModule,
    SidenavModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
