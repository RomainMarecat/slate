import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionListComponent } from './instruction-list.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('InstructionListComponent', () => {
  let component: InstructionListComponent;
  let fixture: ComponentFixture<InstructionListComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstructionListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
