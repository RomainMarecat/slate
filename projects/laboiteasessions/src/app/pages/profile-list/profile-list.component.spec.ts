import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileListComponent } from './profile-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SelectLanguageModule } from '../../shared/components/select-language/select-language.module';
import { SelectSportModule } from '../../shared/components/select-sport/select-sport.module';
import { NgPipesModule } from 'ngx-pipes';
import { SelectDateModule } from '../../shared/components/select-date/select-date.module';
import { SelectCityModule } from '../../shared/components/select-city/select-city.module';

describe('ProfileListComponent', () => {
  let component: ProfileListComponent;
  let fixture: ComponentFixture<ProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileListComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        PipesModule,
        NgPipesModule,
        SelectLanguageModule,
        SelectDateModule,
        SelectCityModule,
        SelectSportModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
