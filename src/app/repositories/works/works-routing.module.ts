import { Routes } from "@angular/router";
import { WorkPreviewComponent } from "../work-preview/work-preview.component";
import { WorksComponent } from "./works.component";
export const routes: Routes = [
  {
    path: 'works',
    component: WorksComponent,
    children: [
      { path: 'work-preview', component: WorkPreviewComponent }
    ]
  }
];