import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { SidenavService } from '../../core/shared/sidenav/sidenav.service';
import { FooterComponent } from '../../core/shared/footer/footer.component';
import { MenuComponent } from '../../core/shared/menu/menu.component';
import { AdsenseModule } from 'ng2-adsense';
import { LoaderComponent } from '../../core/shared/loader/loader.component';
import { UserService } from '../../core/shared/user/user.service';
import { I18nService } from '../../core/shared/i18n/i18n.service';
import { MockUserService } from '../../core/shared/user/mock-user.service';
import { LoaderService } from '../../core/shared/loader/loader.service';
import { MockLoaderService } from '../../core/shared/loader/mock-loader.service';
import { environment } from './../../environments/environment.monpullmoche';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SidenavComponent } from '../../core/shared/sidenav/sidenav.component';
import { AppRootComponent } from './root.component';
import { SharedModule } from '../../core/shared/shared.module';
import { MenuService } from '../../core/shared/menu/menu.service';

describe('AppRootComponent', () => {
  let component: AppRootComponent;
  let fixture: ComponentFixture < AppRootComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          RouterTestingModule,
          BrowserModule,
          HttpClientModule,
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
          }),
          SharedModule
        ],
        declarations: [
          AppRootComponent,
        ],
        providers: [
          { provide: UserService, useClass: MockUserService },
          { provide: LoaderService, useClass: MockLoaderService },
          I18nService,
          MenuService,
          SidenavService,
          Angulartics2GoogleAnalytics
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
