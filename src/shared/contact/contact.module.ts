import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModule } from '../chat/chat.module';

import { ContactRoutingModule } from './contact-routing.module';
import { SharedContactModule } from './shared.contact.module';
import { ContactService } from './shared/contact.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export const TABLE_CONTACT = new InjectionToken<string>('contact');

@NgModule({
  imports: [
    CommonModule,
    ChatModule,
    FormsModule,
    LocalizeRouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    ContactRoutingModule,
    TranslateModule,
    SharedContactModule
  ],
  exports: [
    SharedContactModule
  ],
  providers: [
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: ContactService, useClass: ContactService, deps: [AngularFirestore, TABLE_CONTACT]},
  ]
})
export class ContactModule {
}
