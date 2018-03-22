import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListComponent } from './grid-list.component';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDividerModule, MatExpansionModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatListModule,
  MatRadioModule, MatToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from '../layout-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GridListComponent', () => {
  let component: GridListComponent;
  let fixture: ComponentFixture<GridListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FlexLayoutModule,
        MatCardModule,
        MatToolbarModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatGridListModule,
        MatListModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
      ],
      declarations: [ GridListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
