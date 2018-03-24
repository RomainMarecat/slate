import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListComponent } from './area-list.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('AreaListComponent', () => {
  let component: AreaListComponent;
  let fixture: ComponentFixture<AreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatListModule,
        RouterTestingModule
      ],
      declarations: [ AreaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
