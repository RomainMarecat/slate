import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FabSpeedDialActionComponent } from '../fab-speed-dial-action/fab-speed-dial-action.component';
import { FabSpeedDialComponent } from '../fab-speed-dial/fab-speed-dial.component';

import { FabSpeedDialTriggerComponent } from './fab-speed-dial-trigger.component';

describe('FabSpeedDialTriggerComponent', () => {
  let component: FabSpeedDialTriggerComponent;
  let fixture: ComponentFixture<FabSpeedDialTriggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FabSpeedDialTriggerComponent,
        FabSpeedDialActionComponent,
        FabSpeedDialComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSpeedDialTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  //
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
