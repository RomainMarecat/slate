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
        title: 'gprd.help.dialog.title',
        content: 'gprd.help.dialog.content',
        cta: 'cta.understand'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
      }
    });
  }

}
