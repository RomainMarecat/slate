import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { SharedModule } from '../shared.module';
import { ContactService } from './shared/contact.service';
import { AngularFirestore } from 'angularfire2/firestore';

export const TABLE_CONTACT = new InjectionToken<string>('contact');

@NgModule({
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ],
  declarations: [ContactAddComponent],
  exports: [ContactAddComponent],
  providers: [
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: ContactService, useClass: ContactService, deps: [ AngularFirestore, TABLE_CONTACT ]},
  ]
})
export class ContactModule { }
