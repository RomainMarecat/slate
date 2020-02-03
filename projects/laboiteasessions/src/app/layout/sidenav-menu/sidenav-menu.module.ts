import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { SidenavMenuComponent } from './sidenav-menu.component';


@NgModule({
  declarations: [SidenavMenuComponent],
  exports: [SidenavMenuComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class SidenavMenuModule {
}
