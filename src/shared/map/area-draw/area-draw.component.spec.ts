import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaDrawComponent } from './area-draw.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';
import { LocalizeRouterModule, LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { MockLocalizeRouterService } from 'shared/router/mock-localize-router.service';
import { mockAreas } from 'shared/map/shared/mock-area';

describe('AreaDrawComponent', () => {
  let component: AreaDrawComponent;
  let fixture: ComponentFixture<AreaDrawComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        LocalizeRouterModule,
        RouterTestingModule,
      ],
      declarations: [AreaDrawComponent],
      providers: [
        {provide: LocalizeRouterService, useClass: MockLocalizeRouterService}
      ]
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


  it('should create draw areas', () => {
    component.areas = mockAreas;

    expect(component).toBeTruthy();
  });
});
