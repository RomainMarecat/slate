import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListComponent } from './invoice-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTableModule, MatTooltipModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Invoice1Component } from 'shared/invoice/invoice1/invoice1.component';
import { Invoice2Component } from 'shared/invoice/invoice2/invoice2.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('InvoiceListComponent', () => {
  let component: InvoiceListComponent;
  let fixture: ComponentFixture<InvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
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
