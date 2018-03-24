import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDrawComponent } from './area-draw.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('AreaDrawComponent', () => {
  let component: AreaDrawComponent;
  let fixture: ComponentFixture<AreaDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        RouterTestingModule,
      ],
      declarations: [ AreaDrawComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
