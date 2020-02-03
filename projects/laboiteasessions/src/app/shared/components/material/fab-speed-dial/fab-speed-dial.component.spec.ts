import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FabSpeedDialService } from '../../../services/fab-speed-dial.service';
import { FabSpeedDialActionComponent } from '../fab-speed-dial-action/fab-speed-dial-action.component';
import { FabSpeedDialTriggerComponent } from '../fab-speed-dial-trigger/fab-speed-dial-trigger.component';
import { FabSpeedDialComponent } from './fab-speed-dial.component';


describe('FabSpeedDialComponent', () => {
  let component: FabSpeedDialComponent;
  let fixture: ComponentFixture<FabSpeedDialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FabSpeedDialTriggerComponent,
        FabSpeedDialActionComponent,
        FabSpeedDialComponent
      ],
      providers: [
        FabSpeedDialService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabSpeedDialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
