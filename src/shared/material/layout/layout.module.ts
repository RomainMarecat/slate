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
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule, MatNativeDateModule, MatRadioModule, MatStepperModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
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
export class LayoutModule {
}
