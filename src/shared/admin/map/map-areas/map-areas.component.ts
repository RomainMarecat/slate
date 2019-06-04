import { Component, OnInit, ElementRef, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../menu/menu.service';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { AreaService } from '../../../map/shared/area.service';
import { Area } from '../../../map/shared/area';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-map-areas',
  templateUrl: './map-areas.component.html',
  styleUrls: ['./map-areas.component.scss']
})
export class MapAreasComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  editing = {};
  columns: TableColumn[];
  areas: Area[] = [];
  cache: Area[] = [];
  isLoading = false;
  selected: Area[] = [];
  expanded: any = {};
  @ViewChild('dataTableComponentTable') dataTableComponentTable: any;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('imageCell') imageCell: TemplateRef<any>;
  @ViewChild('priceCell') priceCell: TemplateRef<any>;
  @ViewChild('nameCell') nameCell: TemplateRef<any>;
  @ViewChild('pathCell') pathCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;
  @ViewChild('translationsFrCell') translationsFrCell: TemplateRef<any>;
  @ViewChild('publicationCell') publicationCell: TemplateRef<any>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private areaService: AreaService) {
  }

  ngOnInit() {
    this.columns = this.getColumns();
    this.menuService.nextTitle('Régions de la carte');
    this.isLoading = true;
    this.areaService.getAreas()
      .subscribe((areas: Area[]) => {
        this.areas = areas;
        this.cache = areas;
        this.isLoading = false;
      });
  }

  getColumns(): TableColumn[] {
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
      cellTemplate: this.nameCell
    }, {
      prop: 'path',
      name: 'Path',
      flexGrow: 1,
      cellTemplate: this.pathCell
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

  private updatePublication(area: Area) {
    if (area.published === true) {
      if (!area.published_at) {
        area.published_at = new Date();
      }
    } else {
      area.published_at = null;
    }

    this.areaService.updateArea(area);
  }

  updateAreaPublication(area: Area, event: {source: any, value: boolean}) {
    area.published = event.value;
    this.updatePublication(area);
  }

  /**
   * set at published at now et activate published to true
   */
  publishArea() {
    this.selected.forEach((area: Area) => {
      if (area.published === false) {
        area.published = true;
        this.updatePublication(area);
      }
    });
  }

  unpublishArea() {
    this.selected.forEach((area: Area) => {
      if (area.published === true) {
        area.published = false;
        this.updatePublication(area);
      }
    });
  }

  /**
   *
   * Update a column value with inline editing
   */
  updateValue(event: any, cell: string, row: Area, rowIndex: number) {
    this.editing[rowIndex + '-' + cell] = false;
    const data = {};
    data[cell] = event.target.value;
    const area: Area = {...row, ...data};
    this.areaService.updateDocument(area)
      .then((res) => {
      }, (err) => {
        console.error(err);
      });
  }

  /**
   * Delete a area from list
   */
  deleteAreas() {
    this.selected.forEach((area: Area) => {
      this.areaService.deleteArea(area);
    });
  }

  deleteArea(area: Area) {
    this.areaService.deleteArea(area);
  }

  confirmDelete(area: Area) {
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
        this.deleteArea(area);
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
