import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice2Component } from './invoice2.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

describe('Invoice2Component', () => {
  let component: Invoice2Component;
  let fixture: ComponentFixture<Invoice2Component>;

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
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule
      ],
      declarations: [Invoice2Component],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
