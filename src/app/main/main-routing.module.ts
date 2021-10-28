import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routes as ExploreRoutes } from '../explore/explore-routing.module';
import { routes as WorksRoutes } from '../works/works-routing.module';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'explore', pathMatch: 'full' },
      ...ExploreRoutes,
      ...WorksRoutes
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MainRoutingModule { }
