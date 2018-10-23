import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerComponent } from './partner.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../../menu/menu.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('PartnerComponent', () => {
  let component: PartnerComponent;
  let fixture: ComponentFixture<PartnerComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [PartnerComponent],
      providers: [
        MenuService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
