import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { MenuComponent } from './menu/menu.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [ {
  path: 'component/menu',
  canActivate: [ AdminGuard ],
  component: MenuComponent
}, {
  path: 'component/sidenav',
  canActivate: [ AdminGuard ],
  component: SidenavComponent
}, {
  path: 'component/toolbar',
  canActivate: [ AdminGuard ],
  component: ToolbarComponent
}, ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class NavRoutingModule {
}
