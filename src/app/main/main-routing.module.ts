import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main.component';

import { routes as ExploreRoutes } from '../explore/explore-routing.module';
import { routes as WorksRoutes } from '../works/works-routing.module';
import { routes as BooksmarkRoutes } from '../bookmarks/bookmarks-routing.module';
import { routes as DocumentRoutes } from '../../app/explore/document-preview/document-preview-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'explore', pathMatch: 'full' },
      ...ExploreRoutes,
      ...WorksRoutes,
      ...BooksmarkRoutes,
      ...DocumentRoutes
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MainRoutingModule { }
