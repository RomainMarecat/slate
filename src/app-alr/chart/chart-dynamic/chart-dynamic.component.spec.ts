import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDynamicComponent } from './chart-dynamic.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'shared/shared.module';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('ChartDynamicComponent', () => {
  let component: ChartDynamicComponent;
  let fixture: ComponentFixture<ChartDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ChartsModule,
        SharedModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ ChartDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});