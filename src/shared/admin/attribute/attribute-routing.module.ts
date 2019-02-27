import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import { LocalizeRouterModule } from 'localize-router';
import { AttributeComponent } from './attribute/attribute.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AdminGuard],
    component: AttributeComponent,
    data: {
      breadcrumb: 'breadcrumb.attribute.title'
    },
    children: [
      {
        path: '',
        canActivate: [AdminGuard],
        component: AttributeListComponent,
        data: {
          breadcrumb: 'breadcrumb.attribute.list'
        },
      },
      {
        path: 'edit/:key',
        canActivate: [AdminGuard],
        component: AttributeEditComponent,
        data: {
          breadcrumb: 'breadcrumb.attribute.edit'
        },
      },
      {
        path: 'add',
        canActivate: [AdminGuard],
        component: AttributeEditComponent,
        data: {
          breadcrumb: 'breadcrumb.attribute.add'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule, LocalizeRouterModule]
})
export class AttributeRoutingModule {
}
