import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';



@NgModule({
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class NavigationModule { }
