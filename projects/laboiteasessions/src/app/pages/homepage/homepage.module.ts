import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFactoryModule } from '../../shared/components/material/material-factory.module';
import { AdvantagesHookComponent } from './advantages-hook/advantages-hook.component';

import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage.routing.module';
import { MonoSelectorComponent } from './mono-selector/mono-selector.component';
import { PressHookComponent } from './press-hook/press-hook.component';
import { SocialNetworkHookComponent } from './social-network-hook/social-network-hook.component';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { CarouselModule } from '../../shared/components/carousel/carousel.module';


@NgModule({
  imports: [
    ReactiveFormsModule,
    MaterialFactoryModule,
    CarouselModule,
    CommonModule,
    LogoModule,
    HomepageRoutingModule
  ],
  declarations: [
    HomepageComponent,
    MonoSelectorComponent,
    SocialNetworkHookComponent,
    AdvantagesHookComponent,
    PressHookComponent,
  ]
})
export class HomepageModule {
}
