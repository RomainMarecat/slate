import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBuilderEditComponent } from './layout-builder-edit.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTooltipModule } from '@angular/material';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StyleService } from 'shared/layout-builder/shared/style.service';
import { ThemeStorageService } from 'shared/layout-builder/shared/theme-storage.service';

describe('LayoutBuilderEditComponent', () => {
  let component: LayoutBuilderEditComponent;
  let fixture: ComponentFixture<LayoutBuilderEditComponent>;

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
