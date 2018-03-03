import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ChipsComponent } from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

const routes: Routes = [ {
  path: 'component/button',
  canActivate: [ AdminGuard ],
  component: ButtonComponent
},
  {
    path: 'component/button-toggle',
    canActivate: [ AdminGuard ],
    component: ButtonToggleComponent
  },
  {
    path: 'component/chips',
    canActivate: [ AdminGuard ],
    component: ChipsComponent
  },
  {
    path: 'component/icon',
    canActivate: [ AdminGuard ],
    component: IconComponent
  },
  {
    path: 'component/progress-bar',
    canActivate: [ AdminGuard ],
    component: ProgressBarComponent
  },
  {
    path: 'component/progress-spinner',
    canActivate: [ AdminGuard ],
    component: ProgressSpinnerComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ButtonRoutingModule {
}
