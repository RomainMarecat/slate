import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { FabSpeedDialActionComponent } from './fab-speed-dial-action/fab-speed-dial-action.component';
import { FabSpeedDialTriggerComponent } from './fab-speed-dial-trigger/fab-speed-dial-trigger.component';
import { FabSpeedDialComponent } from './fab-speed-dial/fab-speed-dial.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatGridListModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FabSpeedDialComponent,
    FabSpeedDialActionComponent,
    FabSpeedDialTriggerComponent
  ],
  declarations: [
    FabSpeedDialComponent,
    FabSpeedDialActionComponent,
    FabSpeedDialTriggerComponent,
  ],
})
export class MaterialFactoryModule {
}
