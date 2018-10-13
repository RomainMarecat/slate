import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PopupRoutingModule } from './popup-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    PopupRoutingModule
  ],
  declarations: [DialogComponent, SnackbarComponent, TooltipComponent]
})
export class PopupModule {
}
