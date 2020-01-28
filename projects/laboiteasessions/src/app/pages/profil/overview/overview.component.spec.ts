import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgStringPipesModule } from 'ngx-pipes';
import { SelectSportTeachedModule } from '../../../shared/components/select-sport-teached/select-sport-teached.module';
import { ParameterService } from '../../../shared/parameter/parameter.service';
import { CountryService } from '../../../shared/services/country.service';
import { ProfilService } from '../../../shared/services/profil.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        SelectSportTeachedModule,
        HttpClientTestingModule,
        NgStringPipesModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        CountryService,
        ParameterService,
        ProfilService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
