import { Component, Inject, OnInit } from '@angular/core';
import { TableColumn } from '@swimlane/ngx-datatable';
import { Partner } from '../../../partner/partner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatChipSelectionChange } from '@angular/material/chips';

export interface SimpleTableColumn {
  prop: string;
  flexGrow: number;
  active: boolean;
  name: string;
}

@Component({
  selector: 'app-alr-partner-import-preview',
  templateUrl: './partner-import-preview.component.html',
  styleUrls: ['./partner-import-preview.component.scss']
})
export class PartnerImportPreviewComponent implements OnInit {

  columns: SimpleTableColumn[] = [];
  displayedColumns: TableColumn[] = [];

  constructor(public dialogRef: MatDialogRef<PartnerImportPreviewComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    //  Charger les colonnes et pouvoir les ajouter/suprimer des colonnes comme on le souhaite
    if (this.data && this.data.partners) {
      this.columns = this.getColumns(this.data.partners.slice(0, 1));
      this.displayedColumns = this.columns.map(this.getDisplayedValues);
    }
  }

  ngOnInit() {
  }

  onKeepSavedColumns() {
    this.columns = JSON.parse(localStorage.getItem('columns_partners'));
    this.onToggleChip();
  }

  getDisplayedValues(column: SimpleTableColumn): TableColumn {
    return {prop: column.prop, name: column.name, flexGrow: column.flexGrow};
  }

  onToggleChip(chip?: MatChipSelectionChange) {
    this.displayedColumns = this.columns
      .filter((c) => c.active)
      .map(this.getDisplayedValues);
  }

  onRemoveColumn(column: SimpleTableColumn) {
    this.columns = this.columns
      .filter((c) => c.active && column.name !== c.name);

    localStorage.setItem('columns_partners', JSON.stringify(this.columns));

    this.displayedColumns = this.columns.map(this.getDisplayedValues);
  }

  /**
   * liste les clés du partenaire et les exposent dans le tableau
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

  /**
   * Ferme la modal avec un résultat
   */
  close(result: any): void {
    this.dialogRef.close(result);
  }
}
