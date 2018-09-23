import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ChipsComponent } from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [{
  path: 'component/button',
  component: ButtonComponent
},
  {
    path: 'component/button-toggle',
    component: ButtonToggleComponent
  },
  {
    path: 'component/chips',
    component: ChipsComponent
  },
  {
    path: 'component/icon',
    component: IconComponent
  },
  {
    path: 'component/progress-bar',
    component: ProgressBarComponent
  },
  {
    path: 'component/progress-spinner',
    component: ProgressSpinnerComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class ButtonRoutingModule {
}
