import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerNameComponent } from './partner-name.component';
import { PartnerService } from '../partner.service';
import { MockPartnerService } from '../mock-partner.service';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('PartnerNameComponent', () => {
  let component: PartnerNameComponent;
  let fixture: ComponentFixture<PartnerNameComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerNameComponent],
      providers: [
        {provide: PartnerService, useClass: MockPartnerService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
