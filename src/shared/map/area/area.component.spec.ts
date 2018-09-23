import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaComponent } from './area.component';
import { CommonModule } from '@angular/common';
import { AreaService } from '../shared/area.service';
import { MockAreaService } from '../shared/mock-area.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AreaListComponent } from '../area-list/area-list.component';
import { AreaDrawComponent } from '../area-draw/area-draw.component';
import { MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgArrayPipesModule } from 'ngx-pipes';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('AreaComponent', () => {
  let component: AreaComponent;
  let fixture: ComponentFixture<AreaComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatListModule,
        NgArrayPipesModule,
        FlexLayoutModule,
        RouterTestingModule,
      ],
      declarations: [ AreaComponent, AreaListComponent, AreaDrawComponent ],
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
