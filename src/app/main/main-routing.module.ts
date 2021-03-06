import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { routes as ExploreRoutes } from '../explore/explore-routing.module';
import { routes as RepositoryRoutes } from '../repositories/repositories-routing.module';
import { routes as AccountSettingsRoutes } from '../account-settings/account-settings-routing.module';
import { routes as BookmarkRoutes } from '../bookmarks/bookmarks-routing.module';
import { routes as AboutRoutes } from '../about/about-routing.module';

import { MainComponent } from './main.component';

// ALL ROUTES FROM MAIN SHOULD BE INCLUDED HERE
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'explore', pathMatch: 'full' },
      ...ExploreRoutes,
      ...RepositoryRoutes,
      ...AccountSettingsRoutes,
      ...BookmarkRoutes,
      ...AboutRoutes      
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)]
})
export class MainRoutingModule { }
