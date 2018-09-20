import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListComponent } from './offer-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { OfferService } from '../offer.service';
import { MockOfferService } from '../mock-offer.service';
import { OfferDetailComponent } from '../offer-detail/offer-detail.component';
import { MatButtonModule, MatCardModule, MatIconModule } from '@angular/material';
import { PartnerModule } from '../../partner/partner.module';
import { PartnerService } from '../../partner/partner.service';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MockPartnerService } from 'shared/partner/mock-partner.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('OfferListComponent', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        PartnerModule,
        FlexLayoutModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [OfferListComponent, OfferDetailComponent],
      providers: [
        {provide: OfferService, useClass: MockOfferService},
        {provide: AlertService, useClass: MockAlertService},
        {provide: PartnerService, useClass: MockPartnerService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
