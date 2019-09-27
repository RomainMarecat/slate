import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';
import { ChatModule } from '../chat/chat.module';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactService } from './shared/contact.service';

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
    TranslateModule,
  ],
  declarations: [ContactAddComponent],
  exports: [ContactAddComponent],
  providers: [
    {provide: TABLE_CONTACT, useValue: 'contact'},
    {provide: ContactService, useClass: ContactService, deps: [AngularFirestore, TABLE_CONTACT]},
  ]
})
export class SharedContactModule {
}
