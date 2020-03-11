import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BookingsService } from '../../../../shared/services/bookings.service';
import { initialAppState } from '../../../../shared/store/app.state';
import { MockStoreModule } from '../../../../shared/store/mock/mock-store.module';
import { CartService } from '../../../../shared/services/cart.service';

import { StripeFormComponent } from './stripe-form.component';

describe('StripeFormComponent', () => {
  let component: StripeFormComponent;
  let fixture: ComponentFixture<StripeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StripeFormComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MockStoreModule.forRoot('app', initialAppState),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        CartService,
        BookingsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StripeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
