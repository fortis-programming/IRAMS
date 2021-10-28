import { Routes } from "@angular/router";
import { DocumentPreviewComponent } from "./document-preview/document-preview.component";
import { ExploreContentComponent } from "./explore-content/explore-content.component";
import { ExploreComponent } from "./explore.component";

export const routes: Routes = [
  {
    path: 'explore',
    component: ExploreComponent,
    children: [
      { path: '', redirectTo: 'archives', pathMatch: 'full' },
      {
        path: 'preview/:id',
        component: DocumentPreviewComponent
      },
      {
        path: 'archives',
        component: ExploreContentComponent
      }
    ]
  }
]