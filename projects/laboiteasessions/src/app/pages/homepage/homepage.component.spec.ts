import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { JwtModule } from '@auth0/angular-jwt';
import { LoaderModule } from '../../shared/components/loader/loader.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialFactoryModule } from '../../shared/components/material/material-factory.module';
import { CarouselModule } from '../../shared/components/carousel/carousel.module';
import { CommonModule } from '@angular/common';
import { LogoModule } from '../../shared/components/logo/logo.module';
import { MonoSelectorComponent } from './mono-selector/mono-selector.component';
import { SocialNetworkHookComponent } from './social-network-hook/social-network-hook.component';
import { AdvantagesHookComponent } from './advantages-hook/advantages-hook.component';
import { PressHookComponent } from './press-hook/press-hook.component';
import { MockStoreModule } from '../../shared/store/mock/mock-store.module';
import { initialAppState } from '../../shared/store/app.state';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomepageComponent,
        MonoSelectorComponent,
        SocialNetworkHookComponent,
        AdvantagesHookComponent,
        PressHookComponent,
      ],
      imports: [
        NoopAnimationsModule,
        LeafletModule,
        HttpClientTestingModule,
        LoaderModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MaterialFactoryModule,
        CarouselModule,
        CommonModule,
        LogoModule,
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
