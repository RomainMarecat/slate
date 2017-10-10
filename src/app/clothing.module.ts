import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { ClothingRoutingModule } from './clothing-routing.module';
import { ClothingListComponent } from './clothing-list/clothing-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClothingDetailComponent } from './clothing-detail/clothing-detail.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { ClothingItemComponent } from './clothing-item/clothing-item.component';
import { ClothingService } from './shared/clothing.service';
import { environment } from './../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatCardModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatGridListModule } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    ClothingRoutingModule
  ],
   declarations: [
    ClothingListComponent,
    ClothingDetailComponent,
    MenuComponent,
    FooterComponent,
    ClothingItemComponent
  ],
  providers: [
    ClothingService
  ],
  bootstrap: [
    ClothingListComponent
  ]
})
export class ClothingModule { }
