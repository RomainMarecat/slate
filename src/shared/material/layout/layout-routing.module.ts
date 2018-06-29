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

const routes: Routes = [{
  path: 'component/card',
  component: CardComponent
},
  {
    path: 'component/divider',
    component: DividerComponent
  },
  {
    path: 'component/expansion-panel',
    component: ExpansionPanelComponent
  },
  {
    path: 'component/grid-list',
    component: GridListComponent
  },
  {
    path: 'component/list',
    component: ListComponent
  },
  {
    path: 'component/stepper',
    component: StepperComponent
  },
  {
    path: 'component/tabs',
    component: TabsComponent
  }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
