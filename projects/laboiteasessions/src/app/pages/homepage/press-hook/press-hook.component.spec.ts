import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PressHookComponent } from './press-hook.component';

describe('PressHookComponent', () => {
  let component: PressHookComponent;
  let fixture: ComponentFixture<PressHookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PressHookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PressHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
