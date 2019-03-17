import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferenceComponent } from './preference.component';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PreferenceComponent', () => {
  let component: PreferenceComponent;
  let fixture: ComponentFixture<PreferenceComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreferenceComponent],
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
