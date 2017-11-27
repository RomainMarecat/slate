import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './../../shared/guard/admin.guard';

const routes: Routes = [
{
  path: 'navigation',
  pathMatch: 'full',
  canActivate: [AdminGuard],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
