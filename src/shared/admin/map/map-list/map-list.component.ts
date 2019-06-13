import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../menu/menu.service';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { MapService } from '../../../map/shared/map.service';
import { Map } from '../../../map/shared/map';
import { LocalizeRouterService } from 'localize-router';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.scss']
})
export class MapListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  maps: Map[] = [];
  cache: Map[] = [];
  isLoading = false;
  selected: Map[] = [];
  expanded: any = {};
  @ViewChild('dataTableComponentTable', {static: false}) dataTableComponentTable: any;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;
  @ViewChild('imageCell', {static: false}) imageCell: TemplateRef<any>;
  @ViewChild('priceCell', {static: false}) priceCell: TemplateRef<any>;
  @ViewChild('desktopCell', {static: false}) desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader', {static: false}) desktopHeader: TemplateRef<any>;
  @ViewChild('translationsFrCell', {static: false}) translationsFrCell: TemplateRef<any>;
  @ViewChild('publicationCell', {static: false}) publicationCell: TemplateRef<any>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private mapService: MapService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.columns = this.getColumns();
    this.menuService.nextTitle('Carte');
    this.isLoading = true;
    this.mapService.getMaps()
      .subscribe((maps: Map[]) => {
        this.maps = maps;
        this.cache = maps;
        this.isLoading = false;
      });
  }

  getColumns(): Array<any> {
    return [{
      width: 75,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      headerTemplate: this.checkboxHeader,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'name',
      name: 'Nom',
      flexGrow: 1,
    }, {
      prop: 'map',
      name: 'Map',
      flexGrow: 1,
      cellTemplate: this.publicationCell,
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell,
    }];
  }

  private updatePublication(map: Map) {
    if (map.published === true) {
      if (!map.published_at) {
        map.published_at = new Date();
      }
    } else {
      map.published_at = null;
    }

    this.mapService.updateMap(map);
  }

  updateMapPublication(map: Map, event: {source: any, value: boolean}) {
    map.published = event.value;
    this.updatePublication(map);
  }

  /**
   * set at published at now et activate published to true
   */
  publishMap() {
    this.selected.forEach((map: Map) => {
      if (map.published === false) {
        map.published = true;
        this.updatePublication(map);
      }
    });
  }

  unpublishMap() {
    this.selected.forEach((map: Map) => {
      if (map.published === true) {
        map.published = false;
        this.updatePublication(map);
      }
    });
  }

  editMap(map: Map) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('/admin/map/edit'),
      map.key
    ]);
  }

  /**
   * Delete a map from list
   */
  deleteMaps() {
    this.selected.forEach((map: Map) => {
      this.mapService.deleteMap(map);
    });
  }

  deleteMap(map: Map) {
    this.mapService.deleteMap(map);
  }

  confirmDelete(map: Map) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression du partenaire',
        content: 'Voulez-vous continuer de supprimer le partenaire ?',
        cta: 'Supprimer'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteMap(map);
      }
    });
  }

  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.editMap(event.row);
    }
  }

  toggleExpandRow(row) {
    this.dataTableComponentTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }
}
