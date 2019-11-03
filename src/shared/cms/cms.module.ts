import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';

import { CmsRoutingModule } from './cms-routing.module';
import { FeatureStyle1Component } from './feature/feature-style1/feature-style1.component';
import { HeaderStyle1Component } from './header/header-style1/header-style1.component';
import { HeaderStyle2Component } from './header/header-style2/header-style2.component';
import { PricingStyle1Component } from './pricing/pricing-style1/pricing-style1.component';
import { PricingStyle2Component } from './pricing/pricing-style2/pricing-style2.component';
import { StatisticStyle1Component } from './statistic/statistic-style1/statistic-style1.component';
import { TeamStyle1Component } from './team/team-style1/team-style1.component';
import { PricingStyle3Component } from './pricing/pricing-style3/pricing-style3.component';
import { FeatureStyle2Component } from './feature/feature-style2/feature-style2.component';

@NgModule({
  imports: [
    CommonModule,
    CmsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    FeatureStyle1Component,
    FeatureStyle2Component,
    HeaderStyle1Component,
    HeaderStyle2Component,
    PricingStyle1Component,
    PricingStyle2Component,
    PricingStyle3Component,
    TeamStyle1Component,
    StatisticStyle1Component,
  ],
  exports: [
    FeatureStyle1Component,
    FeatureStyle2Component,
    HeaderStyle1Component,
    HeaderStyle2Component,
    PricingStyle1Component,
    PricingStyle2Component,
    PricingStyle3Component,
    TeamStyle1Component,
    StatisticStyle1Component,
  ]
})
export class CmsModule {
}
