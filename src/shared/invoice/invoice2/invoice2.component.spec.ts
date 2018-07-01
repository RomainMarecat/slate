import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Invoice2Component } from './invoice2.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatListModule, MatTableModule, MatTooltipModule } from '@angular/material';

describe('Invoice2Component', () => {
  let component: Invoice2Component;
  let fixture: ComponentFixture<Invoice2Component>;

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
      declarations: [Invoice2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Invoice2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
