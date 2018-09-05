import { Component, OnInit } from '@angular/core';
import { CsvExtratorService } from 'shared/csv/shared/csv-extrator.service';
import { Partner } from 'shared/partner/partner';
import {
  PartnerImportPreviewComponent
} from 'shared/admin/partner/partner-import-preview/partner-import-preview.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-partner-import',
  templateUrl: './partner-import.component.html',
  styleUrls: ['./partner-import.component.scss']
})
export class PartnerImportComponent implements OnInit {

  currentFile: File;

  partners: Partner[] = [];

  /**
   * @param {MatDialog} matDialog
   * @param {CsvExtratorService} csvExtractorService
   */
  constructor(public matDialog: MatDialog,
              private csvExtractorService: CsvExtratorService) {
  }

  ngOnInit() {
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
        this.openDialog(this.partners);
      }
    };
  }

  openDialog(partners: Partner[]) {
    const dialogRef = this.matDialog.open(PartnerImportPreviewComponent, {
      width: '100%',
      data: {
        title: 'admin.partner.import.dialog.title',
        content: 'admin.partner.import.dialog.content',
        partners: partners.slice(0, 50),
        cta: 'cta.understand'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }
}
