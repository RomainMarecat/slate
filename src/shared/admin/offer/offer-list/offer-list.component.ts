import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../menu/menu.service';
import { Offer } from '../../../offer/offer';
import { OfferService } from '../../shared/offer/offer.service';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  offers: Offer[] = [];
  cache: Offer[] = [];
  isLoading = false;
  selected: Offer[] = [];
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
              private offerService: OfferService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.columns = this.getColumns();
    this.menuService.nextTitle('Offres');
    this.isLoading = true;
    this.offerService.getOffers()
      .subscribe((offers: Offer[]) => {
        this.offers = offers;
        this.cache = offers;
        this.isLoading = false;
      });
  }

  getColumns(): Array<TableColumn> {
    return [{
      width: 75,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      headerTemplate: this.checkboxHeader,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'product',
      name: 'Produit',
      flexGrow: 1,
    }, {
      prop: 'partner',
      name: 'Partenaire',
      flexGrow: 1,
    }, {
      prop: 'price',
      name: 'Prix',
      flexGrow: 1,
    }, {
      prop: 'external_url',
      name: 'Lien',
      flexGrow: 1,
    }, {
      prop: 'published',
      name: 'Publication',
      flexGrow: 1,
      cellTemplate: this.publicationCell,
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell,
    }];
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
      this.router.navigate([
        this.localizeRouterService.translateRoute('/admin'),
        'offer',
        'edit',
        event.row.key
      ]);
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
