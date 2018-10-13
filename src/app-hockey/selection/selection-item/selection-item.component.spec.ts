import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionItemComponent } from './selection-item.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductService } from '../../../shared/product/shared/product.service';
import { MockProductService } from '../../../shared/product/shared/mock-product.service';
import { MockUserService } from '../../../shared/user/shared/mock-user.service';
import { MockAlertService } from '../../../shared/popup/mock-alert.service';
import { MockLoaderService } from '../../../shared/loader/mock-loader.service';
import { MockScoreService } from '../../../shared/score/mock-score.service';
import { DateService } from '../../../shared/util/date.service';
import { ScoreService } from '../../../shared/score/score.service';
import { LoaderService } from '../../../shared/loader/loader.service';
import { AlertService } from '../../../shared/popup/alert.service';
import { UserService } from '../../../shared/user/shared/user.service';
import { SelectionService } from '../../../shared/selection/selection.service';
import { MockSelectionService } from '../../../shared/selection/mock-selection.service';
import { I18nService } from '../../../shared/i18n/i18n.service';

describe('SelectionItemComponent', () => {
  let component: SelectionItemComponent;
  let fixture: ComponentFixture < SelectionItemComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          CommonModule,
          HttpClientModule,
          RouterTestingModule,
          BrowserAnimationsModule,
          SharedModule,
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
        ],
        declarations: [SelectionItemComponent],
        providers: [
          { provide: SelectionService, useClass: MockSelectionService },
          { provide: ProductService, useClass: MockProductService },
          { provide: UserService, useClass: MockUserService },
          { provide: AlertService, useClass: MockAlertService },
          { provide: LoaderService, useClass: MockLoaderService },
          { provide: ScoreService, useClass: MockScoreService },
          { provide: DateService, useClass: DateService },
          I18nService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
