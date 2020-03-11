import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectLanguageModule } from '../../shared/components/select-language/select-language.module';
import { SelectAgeModule } from '../../shared/components/select-age/select-age.module';
import { SelectLevelModule } from '../../shared/components/select-level/select-level.module';
import { SecurityModule } from '../security/security.module';
import { BookingConfirmModalComponent } from './booking-confirm-modal/booking-confirm-modal.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingMonoCardModule } from './booking-mono-card/booking-mono-card.module';
import { BookingPipeComponent } from './booking-pipe.component';
import { BookingPipeRoutingModule } from './booking-pipe.routing.module';
import { BookingSummaryModule } from './booking-summary/booking-summary.module';
import { PipeInfosModule } from './pipe-infos/pipe-infos.module';
import { PipeLoginModule } from './pipe-login/pipe-login.module';
import { PipePaymentModule } from './pipe-payment/pipe-payment.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    BookingPipeRoutingModule,
    BookingSummaryModule,
    BookingMonoCardModule,
    CommonModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    SecurityModule,
    FormsModule,
    ReactiveFormsModule,
    PipeLoginModule,
    PipeInfosModule,
    PipePaymentModule,
    SelectLanguageModule,
    SelectAgeModule,
    SelectLevelModule
  ],
  declarations: [
    BookingPipeComponent,
    BookingConfirmComponent,
    BookingConfirmModalComponent
  ],
  exports: [
    BookingConfirmModalComponent
  ],
  entryComponents: [
    BookingConfirmModalComponent
  ],
})
export class BookingPipeModule {
}
