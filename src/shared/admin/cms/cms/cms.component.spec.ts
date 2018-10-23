import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponent } from './cms.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../../menu/menu.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('CmsComponent', () => {
  let component: CmsComponent;
  let fixture: ComponentFixture<CmsComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [CmsComponent],
      providers: [
        MenuService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
