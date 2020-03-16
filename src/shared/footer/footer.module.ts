import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { Angulartics2Module } from 'angulartics2';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    LocalizeRouterModule,
    TranslateModule.forChild(),
    RouterModule,
  ],
  declarations: [FooterComponent],
  exports: [FooterComponent],
  providers: [
    CmsService,
    CmsDetailService
  ]
})
export class FooterModule {
}
