import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CountryService } from '../../../shared/services/country.service';

import { NationalitySelectComponent } from './nationality-select.component';

describe('NationalitySelectComponent', () => {
  let component: NationalitySelectComponent;
  let fixture: ComponentFixture<NationalitySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NationalitySelectComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        CountryService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalitySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
