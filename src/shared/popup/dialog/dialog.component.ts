import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef < DialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  isString(str: any): boolean {
    return typeof str === 'string';
  }
}
