import { Routes } from "@angular/router";
import { ExploreContentComponent } from "./explore-content/explore-content.component";
import { ExplorePreviewComponent } from "./explore-preview/explore-preview.component";
import { ExploreComponent } from "./explore.component";

export const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      { path: '', redirectTo: 'archives', pathMatch: 'full' },
      {
        path: 'archives',
        component: ExploreContentComponent
      },
      {
        path: 'view/:id',
        component: ExplorePreviewComponent
      }
    ]
  }
]