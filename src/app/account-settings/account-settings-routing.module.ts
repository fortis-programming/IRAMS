import { Routes } from "@angular/router";
import { AccountSettingsComponent } from "./account-settings.component";
import { GeneralSettingsComponent } from "./general-settings/general-settings.component";
import { SecuritySettingsComponent } from "./security-settings/security-settings.component";

export const routes: Routes = [
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    children: [
      { path: '', redirectTo: 'general', pathMatch: 'full' },
      {
        path: 'general',
        component: GeneralSettingsComponent
      },
      {
        path: 'security',
        component: SecuritySettingsComponent
      }
    ]
  }
]