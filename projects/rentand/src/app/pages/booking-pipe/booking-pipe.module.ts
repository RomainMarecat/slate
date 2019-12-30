import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { LanguageSimpleSelectModule } from '../../shared/components/select-language/language-simple-select.module';
import { SelectAgeModule } from '../../shared/components/select-age/select-age.module';
import { SelectLevelModule } from '../../shared/components/select-level/select-level.module';
import { SecurityModule } from '../security/security.module';
import { BookingConfirmModalComponent } from './booking-confirm-modal/booking-confirm-modal.component';
import { BookingConfirmComponent } from './booking-confirm/booking-confirm.component';
import { BookingMonoCardModule } from './booking-mono-card/booking-mono-card.module';
import { BookingPipeComponent } from './booking-pipe.component';
import { BookingPipeRoutingModule } from './booking-pipe.routing.module';
import { BookingPipeService } from './booking-pipe.service';
import { BookingSummaryModule } from './booking-summary/booking-summary.module';
import { PipeInfosModule } from './pipe-infos/pipe-infos.module';
import { PipeLoginModule } from './pipe-login/pipe-login.module';
import { PipePaymentModule } from './pipe-payment/pipe-payment.module';

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
    LanguageSimpleSelectModule,
    SelectAgeModule,
    SelectLevelModule
  ],
  declarations: [
    BookingPipeComponent,
    BookingConfirmComponent,
    BookingConfirmModalComponent
  ],
  providers: [
    BookingPipeService,
    BookingConfirmComponent
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
