import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ChipsComponent } from './chips/chips.component';
import { IconComponent } from './icon/icon.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ButtonRoutingModule } from './button-routing.module';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ButtonRoutingModule
  ],
  declarations: [ButtonComponent, ButtonToggleComponent, ChipsComponent, IconComponent, ProgressSpinnerComponent, ProgressBarComponent]
})
export class ButtonModule { }
