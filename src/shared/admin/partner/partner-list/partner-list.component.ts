import { Component, OnInit, ElementRef, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from './../../../popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';
import { Partner } from 'shared/partner/partner';
import { PartnerService } from 'shared/partner/partner.service';
import { MenuService } from 'shared/menu/menu.service';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent implements OnInit {
  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  partners: Partner[] = [];
  cache: Partner[] = [];
  isLoading = false;
  selected: Partner[] = [];
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
              private partnerService: PartnerService,
              private localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.columns = this.getColumns();
    this.menuService.nextTitle('Partenaires');
    this.isLoading = true;
    this.partnerService.getPartners()
      .subscribe((partners: Partner[]) => {
        this.partners = partners;
        this.cache = partners;
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
      prop: 'website',
      name: 'Site web',
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

  private updatePublication(partner: Partner) {
    if (partner.published === true) {
      if (!partner.published_at) {
        partner.published_at = new Date();
      }
    } else {
      partner.published_at = null;
    }

    this.partnerService.updatePartner(partner);
  }

  updatePartnerPublication(partner: Partner, event: {source: any, value: boolean}) {
    partner.published = event.value;
    this.updatePublication(partner);
  }

  /**
   * set at published at now et activate published to true
   */
  publishPartner() {
    this.selected.forEach((partner: Partner) => {
      if (partner.published === false) {
        partner.published = true;
        this.updatePublication(partner);
      }
    });
  }

  unpublishPartner() {
    this.selected.forEach((partner: Partner) => {
      if (partner.published === true) {
        partner.published = false;
        this.updatePublication(partner);
      }
    });
  }

  editPartner(partner: Partner) {
    this.router.navigate(['/admin/partner/edit/', partner.key]);
  }

  /**
   * Delete a partner from list
   */
  deletePartners() {
    this.selected.forEach((partner: Partner) => {
      this.partnerService.deletePartner(partner);
    });
  }

  deletePartner(partner: Partner) {
    this.partnerService.deletePartner(partner);
  }

  confirmDelete(partner: Partner) {
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
        this.deletePartner(partner);
      }
    });
  }

  /**
   * On select add new list in selection array
   * @param {any} selected
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate(['/admin/partner/edit/', event.row.key]);
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
