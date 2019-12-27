import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LanguageSimpleSelectModule } from '../../shared/components/language/language-simple-select/language-simple-select.module';
import { AuthService } from '../../shared/services/auth.service';
import { BookingsService } from '../../shared/services/bookings.service';

import { MyAccountComponent } from './my-account.component';
import { NationalitySelectModule } from './nationality-select/nationality-select.module';

describe('MyAccountComponent', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyAccountComponent],
      imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        HttpClientTestingModule,
        RouterTestingModule,
        MatSnackBarModule,
        MatRadioModule,
        NationalitySelectModule,
        MatDatepickerModule,
        LanguageSimpleSelectModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () => {
              return 'mock.token';
            }
          }
        }),
        MatDialogModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
        NgxDatatableModule,
        MatDatepickerModule
      ],
      providers: [
        AuthService,
        BookingsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
