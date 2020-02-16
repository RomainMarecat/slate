import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSportComponent } from './select-sport.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SelectSportComponent', () => {
  let component: SelectSportComponent;
  let fixture: ComponentFixture<SelectSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSportComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        HttpClientTestingModule,
        NgPipesModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
