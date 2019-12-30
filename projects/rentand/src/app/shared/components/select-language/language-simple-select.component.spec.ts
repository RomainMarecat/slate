import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

import { LanguageSimpleSelectComponent } from './language-simple-select.component';

describe('LanguageSimpleSelectComponent', () => {
  let component: LanguageSimpleSelectComponent;
  let fixture: ComponentFixture<LanguageSimpleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSimpleSelectComponent],
      imports: [
        CommonModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        LanguageService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSimpleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
