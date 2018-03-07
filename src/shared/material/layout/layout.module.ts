import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { DividerComponent } from './divider/divider.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListComponent } from './list/list.component';
import { StepperComponent } from './stepper/stepper.component';
import { TabsComponent } from './tabs/tabs.component';
import { LayoutRoutingModule } from './layout-routing.module';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatListModule, MatRadioModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    LayoutRoutingModule
  ],
  declarations: [
    CardComponent,
    DividerComponent,
    ExpansionPanelComponent,
    GridListComponent,
    ListComponent,
    StepperComponent,
    TabsComponent
  ]
})
export class LayoutModule {}
