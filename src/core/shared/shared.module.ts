import { InjectionToken, NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgStringPipesModule } from 'angular-pipes';
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
  MatTooltipModule,
  MatExpansionModule,
  MatStepperModule,
  MatRadioModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { SlackModule } from './slack/slack.module';

import { SidenavComponent } from './sidenav/sidenav.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AlertComponent } from './alert/alert.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Environment } from './util/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HammerModule } from './hammer/hammer.module';
import { ProductImageComponent } from './product/product-image/product-image.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ModalModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

export const CONFIG_TOKEN = new InjectionToken < Environment > ('Registered config');

@Injectable()
export class ConfigService {
  configToken: Environment;
  constructor(@Inject(CONFIG_TOKEN) configToken) {
    this.configToken = configToken;
  }
}

@NgModule({
  imports: [
    AngularFireAuthModule,
    Angulartics2Module,
    FileUploadModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    CloudinaryModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
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
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatRadioModule,
    MatStepperModule,
    ModalModule.forRoot(),
    NgStringPipesModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [
    AlertComponent,
    FileUploadModule,
    FlexLayoutModule,
    FooterComponent,
    FormsModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderComponent,
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
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatRadioModule,
    MatStepperModule,
    ModalModule,
    MenuComponent,
    NgStringPipesModule,
    ProductImageComponent,
    SlackModule,
    SidenavComponent,
    RouterModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    AlertComponent
  ],
  declarations: [
    AlertComponent,
    FooterComponent,
    MenuComponent,
    LoaderComponent,
    ProductImageComponent,
    SidenavComponent,
  ],
  providers: [
    // Should not have providers for reason explained here
    // https://angular.io/guide/ngmodule-faq#q-why-child-injector
    // https://embed.plnkr.co/?show=preview
  ]
})
export class SharedModule {
  static forRoot(config: InjectionToken < Environment > ): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        { provide: CONFIG_TOKEN, useValue: config },
      ]
    };
  }
}
