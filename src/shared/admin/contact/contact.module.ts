import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ContactService } from '../../contact/shared/contact.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactComponent } from './contact/contact.component';

const TABLE_CONTACT = new InjectionToken<string>('contact');

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    NgxDatatableModule,
    SharedModule,
    ContactRoutingModule
  ],
  declarations: [
    ContactListComponent,
    ContactDetailComponent,
    ContactComponent
  ],
  providers: [
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {
      provide: ContactService,
      useClass: ContactService,
      deps: [ AngularFirestore, TABLE_CONTACT ]
    },
  ]
})
export class ContactModule {
}
