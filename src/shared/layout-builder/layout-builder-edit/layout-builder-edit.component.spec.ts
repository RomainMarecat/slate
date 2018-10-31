import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBuilderEditComponent } from './layout-builder-edit.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SeoModule } from '../../seo/seo.module';
import { StyleService } from '../shared/style.service';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { ThemeStorageService } from '../shared/theme-storage.service';

describe('LayoutBuilderEditComponent', () => {
  let component: LayoutBuilderEditComponent;
  let fixture: ComponentFixture<LayoutBuilderEditComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [LayoutBuilderEditComponent],
      providers: [
        StyleService,
        ThemeStorageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutBuilderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
