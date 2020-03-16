import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './snackbar/alert.component';
import { DialogComponent } from './dialog/dialog.component';
import { Angulartics2Module } from 'angulartics2';
import { TranslateModule } from '@ngx-translate/core';
import { AlertService } from './alert.service';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    MatBottomSheetModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ],
  entryComponents: [
    AlertComponent,
    DialogComponent,
    BottomSheetComponent
  ],
  declarations: [
    AlertComponent,
    DialogComponent,
    BottomSheetComponent,
  ],
  exports: [
    AlertComponent,
    DialogComponent,
    BottomSheetComponent
  ],
  providers: [
    AlertService
  ]
})
export class PopupModule {
}
