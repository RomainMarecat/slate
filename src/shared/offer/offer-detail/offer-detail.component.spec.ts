import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDetailComponent } from './offer-detail.component';
import {MatCardModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {PartnerModule} from '../../partner/partner.module';

describe('OfferDetailComponent', () => {
  let component: OfferDetailComponent;
  let fixture: ComponentFixture<OfferDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        CommonModule,
        PartnerModule
      ],
      declarations: [ OfferDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
