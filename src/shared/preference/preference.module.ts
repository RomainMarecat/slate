import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferenceComponent } from './preference/preference.component';
import { PreferenceUserComponent } from './preference-user/preference-user.component';
import { PreferenceNotificationComponent } from './preference-notification/preference-notification.component';
import { MaterialModule } from '../material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    PreferenceComponent,
    PreferenceUserComponent,
    PreferenceNotificationComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    PreferenceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class PreferenceModule {
}
