import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatModule } from '../chat/chat.module';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { SharedContactModule } from './shared.contact.module';
import { ContactService } from './shared/contact.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

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
