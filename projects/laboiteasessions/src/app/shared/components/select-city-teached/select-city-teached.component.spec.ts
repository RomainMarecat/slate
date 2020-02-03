import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilService } from '../../services/profil.service';

import { SelectCityTeachedComponent } from './select-city-teached.component';

describe('SelectCityTeachedComponent', () => {
  let component: SelectCityTeachedComponent;
  let fixture: ComponentFixture<SelectCityTeachedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCityTeachedComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        ProfilService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityTeachedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
