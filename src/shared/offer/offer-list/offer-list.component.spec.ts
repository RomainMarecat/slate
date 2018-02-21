import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferListComponent } from './offer-list.component';
import {OfferDetailComponent} from '../offer-detail/offer-detail.component';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule} from '@angular/material';
import {PartnerModule} from '../../partner/partner.module';
import {OfferService} from '../offer.service';
import {MockOfferService} from '../mock-offer.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MockAlertService} from '../../popup/mock-alert.service';
import {AlertService} from '../../popup/alert.service';

describe('OfferListComponent', () => {
  let component: OfferListComponent;
  let fixture: ComponentFixture<OfferListComponent>;

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
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }),
      ],
      declarations: [ OfferListComponent, OfferDetailComponent ],
      providers: [
        {provide: OfferService, useClass: MockOfferService},
        {provide: AlertService, useClass: MockAlertService}
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
