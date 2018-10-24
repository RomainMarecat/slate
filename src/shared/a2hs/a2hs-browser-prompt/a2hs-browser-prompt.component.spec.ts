import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A2hsBrowserPromptComponent } from './a2hs-browser-prompt.component';
import { A2hsService } from '../shared/a2hs.service';

describe('A2hsBrowserPromptComponent', () => {
  let component: A2hsBrowserPromptComponent;
  let fixture: ComponentFixture<A2hsBrowserPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [A2hsBrowserPromptComponent],
      providers: [
        A2hsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A2hsBrowserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
