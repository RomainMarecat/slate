import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule, NativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

describe('ExpansionPanelComponent', () => {
  let component: ExpansionPanelComponent;
  let fixture: ComponentFixture<ExpansionPanelComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatRadioModule,
        MatDatepickerModule,
        NativeDateModule,
        MatNativeDateModule,
        MatButtonModule,
        MatListModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [ExpansionPanelComponent],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
