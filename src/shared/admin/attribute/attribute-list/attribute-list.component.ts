import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Attribute } from '../../../attribute/attribute';
import { AttributeService } from './../../../attribute/attribute.service';
import { MenuService } from './../../../menu/menu.service';
import { take } from 'rxjs/operators';
import { DialogComponent } from './../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-attribute-list',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  attributes: Attribute[];
  isLoading = false;
  selected: Attribute[];
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;
  @ViewChild('actionsCell') actionsCell: TemplateRef < any > ;

  /**
   *
   * @param MatDialog      public  dialog
   * @param Router         private router
   * @param ElementRef     private table
   * @param MenuService    private menuService
   * @param AttributeService private attributeService
   */
  constructor(public dialog: MatDialog,
    private router: Router,
    private table: ElementRef,
    private menuService: MenuService,
    private attributeService: AttributeService) {
    this.selected = [];
  }

  /**
   * Delete a Attribute from list
   */
  deleteAttributes() {
    this.selected.forEach((attribute: Attribute) => {
      this.attributeService.deleteAttribute(attribute);
    });
  }

  deleteAttribute(attribute: Attribute) {
    this.attributeService.deleteAttribute(attribute);
  }

  confirmDelete(attribute: Attribute) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression du produit',
        content: 'Voulez-vous continuer de supprimer le produit ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAttribute(attribute);
      }
    });
  }

  /**
   * Init list of Attribute
   */
  ngOnInit() {
    this.menuService.nextTitle('Attributs');
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'translations.fr',
      name: 'name (fr)',
      flexGrow: 1
    }, {
      prop: 'type',
      name: 'type',
      flexGrow: 1
    }, {
      prop: 'order_by',
      name: 'order_by',
      flexGrow: 1
    }, {
      prop: 'terms',
      name: 'terms',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell
    }, ];
    this.attributeService.getAttributes()
      .take(1)
      .subscribe((attributes: Attribute[]) => {
        this.attributes = attributes;
      });
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate(['/admin/attribute/edit/', event.row.key]);
    }
  }

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}
}
