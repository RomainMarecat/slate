import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { CmsService } from '../admin/shared/cms/cms.service';
import { CmsDetailService } from '../admin/shared/cms-detail/cms-detail.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule
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
