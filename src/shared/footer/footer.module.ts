import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { CmsService } from '../cms/shared/cms.service';
import { CmsDetailService } from '../cms-detail/shared/cms-detail.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    RouterModule,
  ],
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ],
  providers: [
    CmsService,
    CmsDetailService
  ]
})
export class FooterModule {
}
