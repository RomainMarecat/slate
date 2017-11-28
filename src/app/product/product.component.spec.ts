import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavService } from './../shared/sidenav/sidenav.service';
import { FooterComponent } from './../footer/footer.component';
import { MenuComponent } from './../menu/menu.component';
import { AdsenseModule } from 'ng2-adsense';
import { LoaderComponent } from './../shared/loader/loader.component';
import { UserService } from './../shared/user/user.service';
import { I18nService } from './../shared/i18n/i18n.service';
import { MockUserService } from './../shared/user/mock-user.service';
import { LoaderService } from './../shared/loader/loader.service';
import { MockLoaderService } from './../shared/loader/mock-loader.service';
import { environment } from './../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ProductComponent } from './product.component';
import { SidenavComponent } from './../shared/sidenav/sidenav.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture < ProductComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpModule,
          BrowserAnimationsModule,
          AngularFireModule.initializeApp(environment.firebase),
          AngularFirestoreModule,
          AngularFireAuthModule,
          AdsenseModule.forRoot({
            adClient: environment.clientAdSense,
            adSlot: environment.slotAdSense
          }),
          MatCardModule,
          MatToolbarModule,
          MatSidenavModule,
          MatIconModule,
          MatButtonModule,
          MatGridListModule,
          MatFormFieldModule,
          MatSelectModule,
          MatInputModule,
          MatCheckboxModule,
          MatListModule,
          MatSnackBarModule,
          MatProgressSpinnerModule,
          MatLineModule,
          MatMenuModule,
          MatCommonModule,
          MatTooltipModule,
          Angulartics2Module.forRoot([Angulartics2GoogleAnalytics], {
            developerMode: true,
            pageTracking: {
              clearIds: true,
            },
          }),
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          })
        ],
        declarations: [
          ProductComponent,
          SidenavComponent,
          MenuComponent,
          FooterComponent,
          LoaderComponent,
        ],
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: LoaderService, useClass: MockLoaderService },
          I18nService,
          SidenavService,
          Angulartics2GoogleAnalytics
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
