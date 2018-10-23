import { InjectionToken, NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
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
  MatChipsModule, MatProgressBarModule, MatSlideToggleModule, MatTableModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { SlackModule } from './slack/slack.module';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Environment } from './util/environment';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HammerModule } from './hammer/hammer.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { FileUploadModule } from 'ng2-file-upload';
import { MediaModule } from './media/media.module';
import { FooterModule } from './footer/footer.module';
import { SidenavModule } from './sidenav/sidenav.module';
import { LoaderModule } from './loader/loader.module';
import { FacetModule } from './facet/facet.module';
import { PopupModule } from './popup/popup.module';
import { CmsDetailModule } from './cms-detail/cms-detail.module';
import { FaviconModule } from './favicon/favicon.module';
import { PipeModule } from './pipe/pipe.module';
import { SessionModule } from './session/session.module';
import { CmsModule } from './cms/cms.module';
import { CsvModule } from 'shared/csv/csv.module';

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
    CmsDetailModule,
    CmsModule,
    CommonModule,
    CsvModule,
    FaviconModule,
    FacetModule,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
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
    MatSlideToggleModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTableModule,
    MatTooltipModule,
    MatRadioModule,
    MatStepperModule,
    MediaModule,
    NgPipesModule,
    PopupModule,
    PipeModule,
    ReactiveFormsModule,
    RouterModule,
    SessionModule,
    SidenavModule,
    TranslateModule.forChild(),
  ],
  exports: [
    Angulartics2Module,
    CmsModule,
    CmsDetailModule,
    CsvModule,
    FaviconModule,
    FacetModule,
    FileUploadModule,
    FlexLayoutModule,
    FooterModule,
    FormsModule,
    HammerModule,
    HttpClientModule,
    ImageCropperModule,
    LoaderModule,
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
    MatSlideToggleModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatTableModule,
    MatRadioModule,
    MatStepperModule,
    MediaModule,
    NgPipesModule,
    PipeModule,
    PopupModule,
    ReactiveFormsModule,
    RouterModule,
    SessionModule,
    SlackModule,
    SidenavModule,
    TranslateModule,
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
