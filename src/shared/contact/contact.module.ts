import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactService } from './shared/contact.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

export const TABLE_CONTACT = new InjectionToken<string>('contact');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LocalizeRouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ContactRoutingModule,
    TranslateModule,
  ],
  declarations: [ContactAddComponent],
  exports: [ContactAddComponent],
  providers: [
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: ContactService, useClass: ContactService, deps: [AngularFirestore, TABLE_CONTACT]},
  ]
})
export class ContactModule {
}
