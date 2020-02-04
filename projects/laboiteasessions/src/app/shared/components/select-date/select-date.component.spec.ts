import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDateComponent } from './select-date.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';

describe('SelectDateComponent', () => {
  let component: SelectDateComponent;
  let fixture: ComponentFixture<SelectDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectDateComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        MatDatepickerModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
