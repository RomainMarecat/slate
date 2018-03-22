import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { AreaComponent } from '../area/area.component';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../popup/alert.service';
import { MockAlertService } from '../../popup/mock-alert.service';
import { MockMapService } from '../shared/mock-map.service';
import { MapService } from '../shared/map.service';
import { MockAreaService } from '../shared/mock-area.service';
import { AreaService } from '../shared/area.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule
      ],
      declarations: [ MapComponent, AreaComponent ],
      providers: [
        { provide: AlertService, useClass: MockAlertService },
        { provide: MapService, useClass: MockMapService },
        { provide: AreaService, useClass: MockAreaService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
