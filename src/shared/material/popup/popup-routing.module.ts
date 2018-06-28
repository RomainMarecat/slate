import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';

const routes: Routes = [{
  path: 'component/dialog',
  component: DialogComponent
}, {
  path: 'component/snackbar',
  component: SnackbarComponent
}, {
  path: 'component/tooltip',
  component: TooltipComponent
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PopupRoutingModule {
}
