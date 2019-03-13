import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu.component';
import { UserService } from '../user/shared/user.service';
import { MockUserService } from '../user/shared/mock-user.service';
import {
  MatToolbarModule,
  MatIconModule,
  MatButtonModule, MatDialogModule, MatInputModule, MatAutocompleteModule, MatFormFieldModule, MatMenuModule
} from '@angular/material';
import { Angulartics2Module } from 'angulartics2';
import { SidenavService } from '../sidenav/sidenav.service';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader
} from '@ngx-translate/core';
import { MenuService } from './menu.service';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { MockLocalizeRouterService } from '../router/mock-localize-router.service';

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
