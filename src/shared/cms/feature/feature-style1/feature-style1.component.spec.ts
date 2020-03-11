import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureStyle1Component } from './feature-style1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('FeatureStyle1Component', () => {
  let component: FeatureStyle1Component;
  let fixture: ComponentFixture<FeatureStyle1Component>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      declarations: [FeatureStyle1Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureStyle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
