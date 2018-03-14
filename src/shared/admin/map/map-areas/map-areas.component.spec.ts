import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapAreasComponent } from './map-areas.component';

describe('MapAreasComponent', () => {
  let component: MapAreasComponent;
  let fixture: ComponentFixture<MapAreasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapAreasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
