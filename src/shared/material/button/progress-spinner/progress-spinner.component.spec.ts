import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerComponent } from './progress-spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule, MatRadioModule, MatSliderModule,
  MatTooltipModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatTooltipModule,
        MatRadioModule,
        MatProgressBarModule,
        MatSliderModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
      ],
      declarations: [ ProgressSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
