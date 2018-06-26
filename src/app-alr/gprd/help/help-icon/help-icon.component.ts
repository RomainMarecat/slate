import { Component, OnInit } from '@angular/core';
import { DialogComponent } from 'shared/popup/dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-help-icon',
  templateUrl: './help-icon.component.html',
  styleUrls: [ './help-icon.component.scss' ]
})
export class HelpIconComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  openDialog(event: MouseEvent) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'gprd.help.block.content',
        content: 'gprd.help.block.title',
        cta: 'cta.ok'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }

}
