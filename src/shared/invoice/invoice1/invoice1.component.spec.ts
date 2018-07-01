import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice1Component } from './invoice1.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTableModule, MatTooltipModule } from '@angular/material';

describe('Invoice1Component', () => {
  let component: Invoice1Component;
  let fixture: ComponentFixture<Invoice1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatCardModule,
        MatListModule,
        MatTableModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [ Invoice1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
