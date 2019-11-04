import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIcon,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Angulartics2Module } from 'angulartics2';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockMatIconComponent } from '../mock/mock-mat-icon.component';
import { MockLocalizeRouterService } from '../router/mock-localize-router.service';
import { SidenavService } from '../sidenav/sidenav.service';
import { MockUserService } from '../user/shared/mock-user.service';
import { UserService } from '../user/shared/user.service';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        CommonModule,
        LocalizeRouterModule,
        MatDialogModule,
        MatInputModule,
        MatMenuModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatIconModule,
        NoopAnimationsModule,
        MatButtonModule,
        MatToolbarModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [MenuComponent],
      providers: [
        MenuService,
        SidenavService,
        {provide: UserService, useClass: MockUserService},
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
    })
      .overrideModule(MatIconModule, {
        remove: {
          declarations: [MatIcon],
          exports: [MatIcon]
        },
        add: {
          declarations: [MockMatIconComponent],
          exports: [MockMatIconComponent]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
