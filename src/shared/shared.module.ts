import { InjectionToken, NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragulaModule } from 'ng2-dragula';
import { NgPipesModule } from 'ngx-pipes';
import {
  MatAutocompleteModule,
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
  MatRadioModule,
  MatDialogModule,
  MatChipsModule, MatProgressBarModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { SlackModule } from './slack/slack.module';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Environment } from './util/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HammerModule } from './hammer/hammer.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { FileUploadModule } from 'ng2-file-upload';
import { MenuModule } from './menu/menu.module';
import { MediaModule } from './media/media.module';
import { FooterModule } from './footer/footer.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { LoaderModule } from './loader/loader.module';
import { FacetModule } from './facet/facet.module';
import { PopupModule } from './popup/popup.module';
import { PartnerModule } from './partner/partner.module';
import { OfferModule } from './offer/offer.module';
import { CommentModule } from './comment/comment.module';
import { MapModule } from './map/map.module';
import { ProductModule } from './product/product.module';

export const CONFIG_TOKEN = new InjectionToken<Environment>('Registered config');

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
    FacetModule,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    CommentModule,
    CommonModule,
    DragulaModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
    MapModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatRadioModule,
    MatStepperModule,
    MediaModule,
    MenuModule,
    NgPipesModule,
    OfferModule,
    PartnerModule,
    PopupModule,
    ProductModule,
    ReactiveFormsModule,
    RouterModule,
    SidenavModule,
    TranslateModule
  ],
  exports: [
    Angulartics2Module,
    CommentModule,
    DragulaModule,
    FacetModule,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
    MapModule,
    MatAutocompleteModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatRadioModule,
    MatStepperModule,
    MediaModule,
    MenuModule,
    NgPipesModule,
    OfferModule,
    PartnerModule,
    PopupModule,
    ProductModule,
    ReactiveFormsModule,
    RouterModule,
    SlackModule,
    SidenavModule,
    TranslateModule
  ],
  providers: [
    // Should not have providers for reason explained here
    // https://angular.io/guide/ngmodule-faq#q-why-child-injector
    // https://embed.plnkr.co/?show=preview
  ]
})
export class SharedModule {
  static forRoot(config: InjectionToken<Environment>): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        {provide: CONFIG_TOKEN, useValue: config},
      ]
    };
  }
}
