import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryListComponent } from './delivery-list.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderModule } from '../../loader/loader.module';
import { MaterialModule } from '../../material/material.module';
import { NgPipesModule } from 'ngx-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { DeliveryItemComponent } from '../delivery-item/delivery-item.component';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { LoaderService } from '../../loader/loader.service';
import { MockLoaderService } from '../../loader/mock-loader.service';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { DeliveryService } from '../../cart/shared/delivery.service';
import { MockDeliveryService } from '../../cart/shared/mock-delivery.service';
import { UserService } from '../../user/shared/user.service';
import { MockUserService } from '../../user/shared/mock-user.service';

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeliveryListComponent,
        DeliveryItemComponent
      ],
      imports: [
        FlexLayoutModule,
        LoaderModule,
        MaterialModule,
        NgPipesModule,
        RouterTestingModule,
        LocalizeRouterModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService},
        {provide: LoaderService, useClass: MockLoaderService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: DeliveryService, useClass: MockDeliveryService},
        {provide: UserService, useClass: MockUserService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});