import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SelectNumberParticipantComponent } from './select-number-participant.component';

describe('SelectNumberParticipantComponent', () => {
  let component: SelectNumberParticipantComponent;
  let fixture: ComponentFixture<SelectNumberParticipantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectNumberParticipantComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectNumberParticipantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
