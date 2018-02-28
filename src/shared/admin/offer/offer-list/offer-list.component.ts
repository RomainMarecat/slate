import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../../menu/menu.service';
import { MatDialog } from '@angular/material';
import { Offer } from '../../../offer/offer';
import { OfferService } from '../../shared/offer/offer.service';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: [ './offer-list.component.scss' ]
})
export class OfferListComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: any;
  offers: Offer[] = [];
  cache: Offer[] = [];
  isLoading = false;
  selected: Offer[] = [];
  expanded: any = {};
  @ViewChild('dataTableComponentTable') dataTableComponentTable: any;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell') actionsCell: TemplateRef<any>;
  @ViewChild('imageCell') imageCell: TemplateRef<any>;
  @ViewChild('priceCell') priceCell: TemplateRef<any>;
  @ViewChild('desktopCell') desktopCell: TemplateRef<any>;
  @ViewChild('desktopHeader') desktopHeader: TemplateRef<any>;
  @ViewChild('translationsFrCell') translationsFrCell: TemplateRef<any>;
  @ViewChild('publicationCell') publicationCell: TemplateRef<any>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private offerService: OfferService) {
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

  getColumns(): Array<any> {
    return [ {
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
    },  {
      prop: 'published',
      name: 'Publication',
      flexGrow: 1,
      cellTemplate: this.publicationCell,
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell,
    } ];
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
      this.router.navigate(['/admin/offer/edit/', event.row.key]);
    }
  }

  toggleExpandRow(row) {
    this.dataTableComponentTable.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {}

  onScroll(event: any) {}

  onCheckboxChangeFn(event) {}

}
