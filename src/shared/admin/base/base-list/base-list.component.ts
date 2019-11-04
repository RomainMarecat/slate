import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DatatableComponent, TableColumn } from '@swimlane/ngx-datatable';
import { Observable } from 'rxjs';
import { DeviceOrientation } from 'tns-core-modules/ui/enums';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MenuService } from '../../../menu/menu.service';
import { VisitorService } from '../../../firestore/visitor.service';
import { MatDialog } from '@angular/material';
import { LocalizeRouterService } from 'localize-router';
import { Router } from '@angular/router';
import unknown = DeviceOrientation.unknown;

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent<T> implements OnInit {

  headerHeight = 50;

  rowHeight = 50;

  footerHeight = 50;

  columns: TableColumn[] = [];

  selected: T[] = [];

  cache: T[] = [];

  isLoading: boolean;

  expanded: any = {};

  documents: T[] = [];

  publications: Array<object>;

  @ViewChild('dataTableComponentTable', {static: false}) dataTableComponentTable: DatatableComponent;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;
  @ViewChild('imageCell', {static: false}) imageCell: TemplateRef<any>;
  @ViewChild('priceCell', {static: false}) priceCell: TemplateRef<any>;
  @ViewChild('desktopCell', {static: false}) desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader', {static: false}) desktopHeader: TemplateRef<any>;
  @ViewChild('translationsFrCell', {static: false}) translationsFrCell: TemplateRef<any>;
  @ViewChild('publicationCell', {static: false}) publicationCell: TemplateRef<any>;


  constructor(protected menuService: MenuService,
              protected visitorService: VisitorService,
              protected localizeRouterService: LocalizeRouterService,
              protected router: Router,
              public dialog: MatDialog) {
    this.publications = [
      {
        name: 'cta.publish',
        value: 'published',
        color: 'primary',
        selected: false
      },
      {
        name: 'cta.unpublish',
        value: 'unpublished',
        color: 'accent',
        selected: false
      }
    ];
  }

  ngOnInit() {
    this.isLoading = true;
    this.menuService.nextTitle('Base');
    this.getColumns().subscribe(columns => this.columns = columns);
    this.visitorService.getDocuments()
      .subscribe((documents: T[]) => {
        this.documents = documents;
        this.cache = documents;
        this.isLoading = false;
      }, () => {
        this.documents = [];
        this.cache = [];
        this.isLoading = false;
      });
  }

  getColumns(): Observable<TableColumn[]> {
    return new Observable(observer => {
      observer.next([
        {
          width: 75,
          sortable: false,
          canAutoResize: false,
          draggable: false,
          resizeable: false,
          headerTemplate: this.checkboxHeader,
          cellTemplate: this.checkboxCell,
        }, {
          prop: 'key',
          name: 'key',
          flexGrow: 1,
          headerTemplate: this.desktopHeader,
          minWidth: 50,
        }, {
          prop: 'published',
          name: 'published',
          flexGrow: 1,
          headerTemplate: this.desktopHeader,
          cellTemplate: this.publicationCell,
        }, {
          prop: 'key',
          name: 'Actions',
          flexGrow: 1,
          headerTemplate: this.desktopHeader,
          cellTemplate: this.actionsCell,
        }
      ]);
    });
  }


  /**
   * set at published at now et activate published to true
   */
  publish() {
    this.selected.forEach((document: T) => {
      if ((document as unknown as any).published === false) {
        (document as unknown as any).published = true;
        this.updatePublication(document);
      }
    });
  }

  /**
   * Unpublish document
   */
  unpublish() {
    this.selected.forEach((document: T) => {
      if ((document as unknown as any).published === true) {
        (document as unknown as any).published = false;
        this.updatePublication(document);
      }
    });
  }


  /**
   * Update a publication
   */
  private updatePublication(document: T) {
    if ((document as unknown as any).published === true) {
      if (!(document as unknown as any).published_at) {
        (document as unknown as any).published_at = new Date();
      }
    } else {
      (document as unknown as any).published_at = null;
    }

    this.visitorService.updateDocument(document).then(() => {
    });
  }

  /**
   * set published value
   */
  updateDocumentPublication(document: T, event: {source: any, value: boolean}) {
    (document as unknown as any).published = event.value;
    this.updatePublication(document);
  }

  /**
   * Delete a document from list
   */
  deleteDocuments() {
    this.selected.forEach((document: T) => {
      this.visitorService.deleteDocument(document);
    });
  }

  /**
   * delete a single document after confirmation
   */
  deleteDocument(document: T) {
    this.visitorService.deleteDocument(document);
  }

  /**
   * confirm to delete message document
   */
  confirmDelete(document: T) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'admin.order.order-list.delete.title',
        content: 'admin.order.order-list.delete.message',
        cta: 'cta.delete'
      }
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === true) {
          this.deleteDocument(document);
        }
      });
  }

  /**
   * route to show document preview
   */
  showDocument(document: T) {
    if (!(document as unknown as any).key) {
      this.router.navigate(['/']);
    }
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'order',
        (document as unknown as any).key
      ]);
    });
  }

  /**
   * route to edit document
   */
  editDocument(document: T) {
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'order',
        'edit',
        (document as unknown as any).key
      ]);
    });
  }

  /**
   * on document activation
   */
  onActivate(event) {
    if (event.type === 'dblclick') {
      this.editDocument(event.row);
    }
  }

  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  /**
   * expand row
   */
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
