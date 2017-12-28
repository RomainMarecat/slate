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
import { SlackModule } from './slack/slack.module';
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
import {MenuModule} from './menu/menu.module';
import {FooterModule} from './footer/footer.module';
import {SidenavModule} from './sidenav/sidenav.module';
import {LoaderModule} from './loader/loader.module';
import {AlertModule} from './alert/alert.module';

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
    AlertModule,
    AngularFireAuthModule,
    Angulartics2Module,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    CommonModule,
    CloudinaryModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
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
    MenuModule,
    ModalModule.forRoot(),
    NgStringPipesModule,
    RouterModule,
    ReactiveFormsModule,
    SidenavModule,
    TranslateModule
  ],
  exports: [
    AlertModule,
    CloudinaryModule,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
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
    MenuModule,
    ModalModule,
    NgStringPipesModule,
    ProductImageComponent,
    RouterModule,
    ReactiveFormsModule,
    SlackModule,
    SidenavModule
  ],
  declarations: [
    ProductImageComponent,
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
