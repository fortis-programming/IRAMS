import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { HeaderModule } from './header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { SidenavModule } from './sidenav/sidenav.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    RouterModule,
    MainRoutingModule,
    CommonModule,
    HeaderModule,
    SidenavModule
  ]
})
export class MainModule { }
