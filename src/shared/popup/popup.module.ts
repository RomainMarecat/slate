import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './snackbar/alert.component';
import { DialogComponent } from './dialog/dialog.component';
import { Angulartics2Module } from 'angulartics2';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ],
  entryComponents: [
    AlertComponent,
    DialogComponent,
  ],
  declarations: [
    AlertComponent,
    DialogComponent,
  ],
  exports: [
    AlertComponent,
    DialogComponent,
  ]
})
export class PopupModule {
}
