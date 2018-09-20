import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { ChartListComponent } from './chart-list/chart-list.component';
import { ChartsModule } from 'ng2-charts';
import { ChartLineComponent } from './chart-line/chart-line.component';
import { ChartBarComponent } from './chart-bar/chart-bar.component';
import { ChartDoughnutComponent } from './chart-doughnut/chart-doughnut.component';
import { ChartRadarComponent } from './chart-radar/chart-radar.component';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { ChartPolarAreaComponent } from './chart-polar-area/chart-polar-area.component';
import { ChartDynamicComponent } from './chart-dynamic/chart-dynamic.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    SharedModule,
    ChartRoutingModule
  ],
  declarations: [
    ChartListComponent,
    ChartLineComponent,
    ChartBarComponent,
    ChartDoughnutComponent,
    ChartRadarComponent,
    ChartPieComponent,
    ChartPolarAreaComponent,
    ChartDynamicComponent
  ]
})
export class ChartModule {
}
