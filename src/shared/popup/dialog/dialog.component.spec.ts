import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { AlertComponent } from './../snackbar/alert.component';
import { DialogComponent } from './dialog.component';
import { Angulartics2Module } from 'angulartics2';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture < DialogComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          Angulartics2Module,
          CommonModule,
          MatIconModule,
          MatButtonModule,
          MatDialogModule,
        ],
        declarations: [DialogComponent],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
