import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { NavRoutingModule } from './nav-routing.module';
import {
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatCardModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    NavRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    TranslateModule.forChild(),
  ],
  declarations: [MenuComponent, SidenavComponent, ToolbarComponent]
})
export class NavModule { }
