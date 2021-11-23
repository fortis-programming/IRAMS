import { Routes } from "@angular/router";

import { RepositoriesComponent } from "./repositories.component";
import { WorkPreviewComponent } from "./work-preview/work-preview.component";
import { WorksComponent } from "./works/works.component";

//  REPOSITORY ROUTES FOR COMPONENT CHILDREN
export const routes: Routes = [
  {
    path: 'repositories',
    component: RepositoriesComponent,
    children: [
      { path: '', redirectTo: 'works', pathMatch: 'full' },
      { path: 'works', component: WorksComponent },
      { path: 'preview/:id', component: WorkPreviewComponent }
    ]
  }
]