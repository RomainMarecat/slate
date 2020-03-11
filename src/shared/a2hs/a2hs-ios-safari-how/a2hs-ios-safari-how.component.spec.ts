import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A2hsIosSafariHowComponent } from './a2hs-ios-safari-how.component';
import { A2hsService } from '../shared/a2hs.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('A2hsIosSafariHowComponent', () => {
  let component: A2hsIosSafariHowComponent;
  let fixture: ComponentFixture<A2hsIosSafariHowComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
      ],
      declarations: [A2hsIosSafariHowComponent],
      providers: [
        A2hsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A2hsIosSafariHowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
