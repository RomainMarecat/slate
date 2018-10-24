import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A2hsComponent } from './a2hs.component';
import { A2hsBrowserPromptComponent } from '../a2hs-browser-prompt/a2hs-browser-prompt.component';
import { A2hsIosSafariHowComponent } from '../a2hs-ios-safari-how/a2hs-ios-safari-how.component';
import { A2hsService } from '../shared/a2hs.service';

describe('A2hsComponent', () => {
  let component: A2hsComponent;
  let fixture: ComponentFixture<A2hsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        A2hsComponent,
        A2hsBrowserPromptComponent,
        A2hsIosSafariHowComponent
      ],
      providers: [
        A2hsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A2hsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
