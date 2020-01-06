import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CountryService } from '../../services/country.service';

import { SelectNationalityComponent } from './select-nationality.component';

describe('SelectNationalityComponent', () => {
  let component: SelectNationalityComponent;
  let fixture: ComponentFixture<SelectNationalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectNationalityComponent],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
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
    fixture = TestBed.createComponent(SelectNationalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
