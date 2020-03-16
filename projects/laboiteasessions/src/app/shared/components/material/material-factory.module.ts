import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FabSpeedDialActionComponent } from './fab-speed-dial-action/fab-speed-dial-action.component';
import { FabSpeedDialTriggerComponent } from './fab-speed-dial-trigger/fab-speed-dial-trigger.component';
import { FabSpeedDialComponent } from './fab-speed-dial/fab-speed-dial.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
