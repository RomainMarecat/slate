import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportListComponent } from './sport-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

describe('SportListComponent', () => {
  let component: SportListComponent;
  let fixture: ComponentFixture<SportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SportListComponent],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
