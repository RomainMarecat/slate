import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { DocumentReference } from '@firebase/firestore-types';
import { Map } from '../../../map/shared/map';
import { MapFormType } from '../../shared/map/form-map';
import { MapService } from '../../../map/shared/map.service';
import { AreaFormType } from '../../shared/map/form-area';
import { Area } from '../../../map/shared/area';
import { AreaService } from '../../../map/shared/area.service';
import { LocalizeRouterService } from 'localize-router';
import { MapList } from '../shared/map-list';

@Component({
  selector: 'app-admin-map-edit',
  templateUrl: './map-edit.component.html',
  styleUrls: ['./map-edit.component.scss']
})
export class MapEditComponent implements OnInit {
  @Input() showBackButton = false;
  @Input() hideAreas = false;
  form: FormGroup;
  formArea: FormGroup;
  map: Map;
  area: Area;
  loadingFrance: boolean;

  constructor(private mapService: MapService,
              private areaService: AreaService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private localizeRouterService: LocalizeRouterService) {
    this.loadingFrance = false;
    this.createForm();
    this.createAreaForm();
  }

  ngOnInit() {
    this.getMap();
  }

  getMap() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.mapService.getMap(key)
          .subscribe((map: Map) => {
            this.map = map;
            this.createForm();
            this.createAreaForm();
          });
      }
    });
  }

  reset() {
    this.form.reset({
      name: '',
      published: true,
    });
  }

  resetArea() {
    this.formArea.reset({
      name: '',
      path: '',
      published: true
    });
  }

  saveArea() {
    if (this.formArea.valid) {
      this.area = {...this.area, ...this.formArea.value};
      if (this.area.key) {
        if (this.area.published === true) {
          this.area.published_at = new Date();
        }
        this.areaService.updateArea(this.area)
          .then((doc) => {
            this.alertService.toast(`area updated ${this.area.name}`);
            this.resetArea();
          }, (err) => {
            this.alertService.toast(`area error ${err}`);
          });
      } else {
        this.areaService.createArea(this.area)
          .then((doc: DocumentReference) => {
            this.alertService.toast(`area added ${doc.id}`);
            this.resetArea();
          }, (err) => {
            this.alertService.toast(`area error ${err}`);
          });
      }
    }
  }

  saveMap() {
    if (this.form.valid) {
      this.map = {...this.map, ...this.form.value};
      if (this.map.key) {
        if (this.map.published === true) {
          this.map.published_at = new Date();
        }
        this.updateMap();
        this.router.navigate([
          '/admin/map'
        ]);
      } else {
        this.createMap();
      }
    }
  }

  updateMap() {
    this.mapService.updateMap(this.map)
      .then((doc) => {
        this.alertService.toast(`map updated ${this.map.name}`);
        this.reset();
      }, (err) => {
        this.alertService.toast(`map error ${err}`);
      });
  }

  createMap() {
    this.mapService.createMap(this.map)
      .then((doc: DocumentReference) => {
        this.alertService.toast(`map added ${doc.id}`);
        this.reset();
      }, (err) => {
        this.alertService.toast(`map error ${err}`);
      });
  }

  createForm() {
    const formType = new MapFormType(this.map);
    this.form = formType.getForm();
  }

  createAreaForm() {
    const formType = new AreaFormType(this.map);
    this.formArea = formType.getForm();
  }

  addFrance() {
    const franceAreas: Array<{path: string, name: string}> = MapList.getFrance();
    const countFranceAreas: number = franceAreas.length;
    let i = 0;
    this.loadingFrance = true;

    franceAreas.forEach((item: {name: string, path: string}) => {
      const area: Area = {
        map: this.map.key,
        name: item.name,
        path: item.path,
        country: this.map.name,
        published: true,
        published_at: new Date(),
      };

      this.areaService.createArea(area)
        .then((doc: DocumentReference) => {
          this.alertService.toast(`area added ${doc.id}`);
          i++;
          if (countFranceAreas > i) {
            this.loadingFrance = false;
          }
        }, (err) => {
          this.alertService.toast(`area error ${err}`);
        });
    });
  }
}
