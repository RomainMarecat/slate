import { Component, OnInit } from '@angular/core';
import { CsvExtratorService } from 'shared/csv/shared/csv-extrator.service';
import { Partner } from 'shared/partner/partner';
import {
  PartnerImportPreviewComponent
} from 'shared/admin/partner/partner-import-preview/partner-import-preview.component';
import { MatDialog } from '@angular/material';
import { PartnerService } from 'shared/partner/partner.service';
import { AlertService } from 'shared/popup/alert.service';
import { TableColumn } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-partner-import',
  templateUrl: './partner-import.component.html',
  styleUrls: ['./partner-import.component.scss']
})
export class PartnerImportComponent implements OnInit {

  currentFile: File;

  partners: Partner[] = [];

  hadPreviousPartners = false;

  constructor(public matDialog: MatDialog,
              private csvExtractorService: CsvExtratorService,
              private partnerService: PartnerService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    if (localStorage.getItem('partners')) {
      this.hadPreviousPartners = true;
    }
  }

  /**
   * Upload file
   * @param event
   */
  uploadFile(event: {target: {files: FileList}}) {
    const file: File = event.target.files[0];
    this.currentFile = file;
  }

  /**
   * Importe a csv file and show imported partners
   */
  onImportFile() {
    const reader = new FileReader();
    reader.readAsText(this.currentFile);
    reader.onload = (event: any) => {
      const csv = event.target.result;
      this.partners = this.csvExtractorService.extractData(csv) as Partner[];

      if (this.partners && this.partners.length > 0) {
        this.saveInLocalStorage();
        this.openDialog(this.partners);
      }
    };
  }

  /**
   * Importation du dernier fichier
   */
  onImportLastFile() {
    this.partners = JSON.parse(localStorage.getItem('partners'));
    this.openDialog(this.partners);
  }

  /**
   * Sauvegarde en localstorage pour le retrouver directemnent
   */
  saveInLocalStorage() {
    try {
      localStorage.setItem('partners', JSON.stringify(this.partners));
    } catch (e) {
      localStorage.setItem('partners', JSON.stringify(this.partners.slice(0, 50)));
    }
  }

  /**
   * Ouvrir la fenêtre pour
   * @param {Partner[]} partners pour choisir ses colonnes
   */
  openDialog(partners: Partner[]) {
    const dialogRef = this.matDialog.open(PartnerImportPreviewComponent, {
      width: '100%',
      data: {
        title: 'admin.partner.import.dialog.title',
        content: 'admin.partner.import.dialog.content',
        partners: partners.slice(0, 50),
        cta: 'cta.save'
      }
    });

    dialogRef.afterClosed().subscribe((result: {columns: TableColumn[]}) => {
      if (result['columns']) {
        const columns: string[] = result.columns.map(i => i.prop.toString());
        const partnerToImport = this.partners.map((partner) => {
          const filters = {};
          Object.keys(partner).forEach((key: string) => {
            if (columns.includes(key)) {
              filters[key] = partner[key];
            }
          });
          return filters;
        });

        this.importPartners(partnerToImport);
      }
    });
  }

  /**
   * Check all previous partners in db and add only new partners
   * @param partners
   */
  importPartners(partners) {
    let previousPartners: Partner[] = [];
    let partnersToImport: Partner[] = partners;

    this.partnerService.getPartners()
      .subscribe((p) => {
        previousPartners = p;

        previousPartners.forEach((prevPartner) => {
          partners.forEach((partner, index) => {
            if (prevPartner.id === partner.id || prevPartner.name === partner.name) {
              partnersToImport = partnersToImport.splice(index, 1);
            }
          });
        });

        this.createPartners(partnersToImport);
      });
  }

  /**
   * Save in db all partners list
   * @param {Partner[]} partners
   */
  createPartners(partners: Partner[]) {
    let incrementError = 0;
    partners.forEach((partner) => {
      if (incrementError <= 5) {
        this.partnerService.createPartner(partner)
          .then(() => {
            this.alertService.show('partner.import.created');
          }, (err) => {
            incrementError++;
            this.alertService.show(err);

            if (incrementError === 5) {
              this.alertService.show('partner.import.stop');
            }
          });
      }
    });
  }
}
