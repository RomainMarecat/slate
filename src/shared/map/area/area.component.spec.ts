import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComponent } from './area.component';
import { CommonModule } from '@angular/common';
import { AreaService } from '../shared/area.service';
import { MockAreaService } from '../shared/mock-area.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AreaComponent', () => {
  let component: AreaComponent;
  let fixture: ComponentFixture<AreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
      ],
      declarations: [ AreaComponent ],
      providers: [
        {provide: AreaService, useClass: MockAreaService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
