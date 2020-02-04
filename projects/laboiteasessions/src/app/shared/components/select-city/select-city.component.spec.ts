import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCityComponent } from './select-city.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CityService } from '../../services/city.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

describe('SelectCityComponent', () => {
  let component: SelectCityComponent;
  let fixture: ComponentFixture<SelectCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectCityComponent],
      imports: [
        MatSelectModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        CityService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
