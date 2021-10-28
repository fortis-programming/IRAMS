import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { HeaderModule } from './header/header.module';
import { MainRoutingModule } from './main-routing.module';
import { SidenavModule } from './sidenav/sidenav.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    HeaderModule,
    MainRoutingModule,
    RouterModule,
    SidenavModule
  ]
})
export class MainModule { }
