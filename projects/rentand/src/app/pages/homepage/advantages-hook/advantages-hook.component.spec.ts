import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantagesHookComponent } from './advantages-hook.component';

describe('AdvantagesHookComponent', () => {
  let component: AdvantagesHookComponent;
  let fixture: ComponentFixture<AdvantagesHookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvantagesHookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvantagesHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
