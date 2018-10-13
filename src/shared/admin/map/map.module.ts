import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { MapListComponent } from './map-list/map-list.component';
import { MapEditComponent } from './map-edit/map-edit.component';
import { SharedModule } from '../../shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AngularFirestore } from 'angularfire2/firestore';
import { MapService } from '../../map/shared/map.service';
import { MapAreasComponent } from './map-areas/map-areas.component';
import { AreaService } from '../../map/shared/area.service';
import { TranslateModule } from '@ngx-translate/core';

const TABLE_MAP = new InjectionToken < string > ('map');
const TABLE_AREA = new InjectionToken < string > ('area');

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    MapRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ],
  declarations: [MapListComponent, MapEditComponent, MapAreasComponent],
  providers: [
    { provide: TABLE_MAP, useValue: 'map' },
    { provide: TABLE_AREA, useValue: 'area' },
    { provide: MapService, useClass: MapService, deps: [AngularFirestore, TABLE_MAP] },
    { provide: AreaService, useClass: AreaService, deps: [AngularFirestore, TABLE_AREA] },
  ]
})
export class MapModule {}
