import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { HeaderStyle1Component } from './header/header-style1/header-style1.component';
import { HeaderStyle2Component } from './header/header-style2/header-style2.component';
import { FeatureStyle1Component } from './feature/feature-style1/feature-style1.component';
import { PricingStyle1Component } from './pricing/pricing-style1/pricing-style1.component';
import { TeamStyle1Component } from './team/team-style1/team-style1.component';
import { StatisticStyle1Component } from './statistic/statistic-style1/statistic-style1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
  ],
  declarations: [
    HeaderStyle1Component,
    HeaderStyle2Component,
    FeatureStyle1Component,
    PricingStyle1Component,
    TeamStyle1Component,
    StatisticStyle1Component
  ],
  exports: [
    HeaderStyle1Component,
    HeaderStyle2Component,
    FeatureStyle1Component,
    PricingStyle1Component,
    TeamStyle1Component,
    StatisticStyle1Component
  ]
})
export class CmsModule {
}
