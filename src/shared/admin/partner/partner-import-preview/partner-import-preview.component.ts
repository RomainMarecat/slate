import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Partner } from 'shared/partner/partner';

@Component({
  selector: 'app-alr-partner-import-preview',
  templateUrl: './partner-import-preview.component.html',
  styleUrls: ['./partner-import-preview.component.scss']
})
export class PartnerImportPreviewComponent implements OnInit {

  columns: TableColumn[] = [];

  /**
   * @param {MatDialogRef<PartnerImportPreviewComponent>} dialogRef
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<PartnerImportPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data && this.data.partners) {
      this.columns = this.getColumns(this.data.partners.slice(0, 1));
    }
  }

  ngOnInit() {
  }

  /**
   * liste les clés du partenaire et les exposent dans le tableau
   * @param {Partner[]} partners
   * @returns {TableColumn[]}
   */
  getColumns(partners: Partner[]): TableColumn[] {
    return Object.keys(partners[0]).map((key: string) => {
      return {
        prop: key,
        name: key,
        flexGrow: 1
      } as TableColumn;
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
