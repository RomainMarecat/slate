import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { NavRoutingModule } from './nav-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NavRoutingModule
  ],
  declarations: [MenuComponent, SidenavComponent, ToolbarComponent]
})
export class NavModule { }
