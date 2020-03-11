import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListComponent } from './invoice-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { Invoice1Component } from '../invoice1/invoice1.component';
import { Invoice2Component } from '../invoice2/invoice2.component';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        LocalizeRouterModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        InvoiceListComponent,
        Invoice1Component,
        Invoice2Component
      ],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
