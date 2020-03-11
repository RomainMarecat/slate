import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineComponent } from './timeline.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SeoModule } from '../../seo/seo.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MatChipsModule } from '@angular/material/chips';

describe('TimelineComponent', () => {
  let component: TimelineComponent;
  let fixture: ComponentFixture<TimelineComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        LocalizeRouterModule,
        MatIconModule,
        SeoModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        RouterTestingModule
      ],
      declarations: [TimelineComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
