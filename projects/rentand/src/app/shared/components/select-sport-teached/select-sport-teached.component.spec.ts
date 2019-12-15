import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProfilService } from '../../services/profil.service';

import { SelectSportTeachedComponent } from './select-sport-teached.component';

describe('SelectSportTeachedComponent', () => {
  let component: SelectSportTeachedComponent;
  let fixture: ComponentFixture<SelectSportTeachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectSportTeachedComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: [
        ProfilService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSportTeachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
