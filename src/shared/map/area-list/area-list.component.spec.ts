import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaListComponent } from './area-list.component';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NgArrayPipesModule } from 'ngx-pipes';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';

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
