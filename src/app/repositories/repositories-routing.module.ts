import { Routes } from "@angular/router";
import { WorkPreviewComponent } from "./work-preview/work-preview.component";

import { WorksComponent } from "./works/works.component";
import { RepositoriesComponent } from "./repositories.component";

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