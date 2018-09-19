import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PartnerImportPreviewComponent} from './partner-import-preview.component';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatDialogModule,
  MatDialogRef,
  MatIconModule
} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateFakeLoader, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

describe('PartnerImportPreviewComponent', () => {
  let component: PartnerImportPreviewComponent;
  let fixture: ComponentFixture<PartnerImportPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        MatChipsModule,
        NgxDatatableModule,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [PartnerImportPreviewComponent],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerImportPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
