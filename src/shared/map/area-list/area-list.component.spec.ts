import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListComponent } from './area-list.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NgArrayPipesModule } from 'ngx-pipes';
import { LocalizeRouterModule, LocalizeRouterService } from 'localize-router';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MockLocalizeRouterService } from '../../router/mock-localize-router.service';

describe('AreaListComponent', () => {
  let component: AreaListComponent;
  let fixture: ComponentFixture<AreaListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatListModule,
        NgArrayPipesModule,
        LocalizeRouterModule,
        RouterTestingModule
      ],
      declarations: [AreaListComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
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
