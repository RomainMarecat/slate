import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [{
  path: 'component/dialog',
  component: DialogComponent
}, {
  path: 'component/snackbar',
  component: SnackbarComponent
}, {
  path: 'component/tooltip',
  component: TooltipComponent
}, ];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, LocalizeRouterModule
  ]
})
export class PopupRoutingModule {
}
