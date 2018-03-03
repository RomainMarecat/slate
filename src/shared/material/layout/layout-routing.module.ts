import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [ {
  path: 'component/card',
  canActivate: [ AdminGuard ],
  component: CardComponent
},
  {
    path: 'component/divider',
    canActivate: [ AdminGuard ],
    component: DividerComponent
  },
  {
    path: 'component/expansion-panel',
    canActivate: [ AdminGuard ],
    component: ExpansionPanelComponent
  },
  {
    path: 'component/grid-list',
    canActivate: [ AdminGuard ],
    component: GridListComponent
  },
  {
    path: 'component/list',
    canActivate: [ AdminGuard ],
    component: ListComponent
  },
  {
    path: 'component/stepper',
    canActivate: [ AdminGuard ],
    component: StepperComponent
  },
  {
    path: 'component/tabs',
    canActivate: [ AdminGuard ],
    component: TabsComponent
  }, ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class LayoutRoutingModule {
}
