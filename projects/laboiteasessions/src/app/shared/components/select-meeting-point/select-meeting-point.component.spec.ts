import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SelectMeetingPointComponent } from './select-meeting-point.component';

describe('SelectMeetingPointComponent', () => {
  let component: SelectMeetingPointComponent;
  let fixture: ComponentFixture<SelectMeetingPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMeetingPointComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMeetingPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
