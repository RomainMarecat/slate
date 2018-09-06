import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatChipSelectionChange, MatDialogRef } from '@angular/material';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Partner } from 'shared/partner/partner';

@Component({
  selector: 'app-alr-partner-import-preview',
  templateUrl: './partner-import-preview.component.html',
  styleUrls: ['./partner-import-preview.component.scss']
})
export class PartnerImportPreviewComponent implements OnInit {

  columns: {prop: string, name: string, flexGrow: number, active: boolean}[] = [];
  displayedColumns: TableColumn[] = [];

  /**
   * @param {MatDialogRef<PartnerImportPreviewComponent>} dialogRef
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<PartnerImportPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    //  Charger les colonnes et pouvoir les ajouter/suprimer des colonnes comme on le souhaite
    if (this.data && this.data.partners) {
      this.columns = this.getColumns(this.data.partners.slice(0, 1));
      this.displayedColumns = this.columns.map((column) => {
        return {prop: column.prop, name: column.name, flexGrow: column.flexGrow};
      });
    }
  }

  ngOnInit() {
  }

  onToggleChip(chip: MatChipSelectionChange) {
    this.displayedColumns = this.columns.filter((c) => c.active).map((column) => {
      return {prop: column.prop, name: column.name, flexGrow: column.flexGrow};
    });
  }

  /**
   * liste les clés du partenaire et les exposent dans le tableau
   * @param {Partner[]} partners
   * @returns {TableColumn[]}
   */
  getColumns(partners: Partner[]): {prop: string, name: string, flexGrow: number, active: boolean}[] {
    return Object.keys(partners[0]).map((key: string) => {
      return {
        prop: key,
        name: key,
        flexGrow: 1,
        active: true
      };
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
