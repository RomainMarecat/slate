import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FabSpeedDialTriggerComponent } from '../fab-speed-dial-trigger/fab-speed-dial-trigger.component';
import { FabSpeedDialComponent } from '../fab-speed-dial/fab-speed-dial.component';

import { FabSpeedDialActionComponent } from './fab-speed-dial-action.component';

describe('FabSpeedDialActionComponent', () => {
  let component: FabSpeedDialActionComponent;
  let fixture: ComponentFixture<FabSpeedDialActionComponent>;

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
    fixture = TestBed.createComponent(FabSpeedDialActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
