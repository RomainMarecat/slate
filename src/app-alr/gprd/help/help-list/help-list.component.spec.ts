import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpListComponent } from './help-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HelpIconComponent } from '../help-icon/help-icon.component';
import { MatCardModule, MatDialogModule, MatIconModule } from '@angular/material';

describe('HelpListComponent', () => {
  let component: HelpListComponent;
  let fixture: ComponentFixture<HelpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        HelpListComponent,
        HelpIconComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
