import { Routes } from "@angular/router";
import { DocumentPreviewComponent } from "./document-preview.component";

export const routes: Routes = [
  { path: 'preview/:id', component: DocumentPreviewComponent }
];