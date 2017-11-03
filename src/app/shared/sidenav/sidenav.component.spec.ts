import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { SidenavService } from './sidenav.service';
import { SidenavComponent } from './sidenav.component';
import { FooterComponent } from './../../footer/footer.component';
import { MenuComponent } from './../../menu/menu.component';
import { AdsenseModule } from 'ng2-adsense';
import { LoaderComponent } from './../loader/loader.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        HttpModule,
        AdsenseModule,
        MatGridListModule,
        MatListModule,
        MatSidenavModule,
        MatCardModule,
        MatToolbarModule,
        MatProgressSpinnerModule,

      ],
      declarations: [ SidenavComponent, LoaderComponent, FooterComponent, MenuComponent ],
      providers: [
        SidenavService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
