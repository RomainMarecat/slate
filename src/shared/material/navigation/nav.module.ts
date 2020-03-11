import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { NavRoutingModule } from './nav-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
