import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionDetailComponent } from './instruction-detail.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('InstructionDetailComponent', () => {
  let component: InstructionDetailComponent;
  let fixture: ComponentFixture<InstructionDetailComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
