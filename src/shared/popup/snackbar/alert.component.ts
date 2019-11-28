import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';
import { Alert } from '../alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  timer: number;

  constructor(private matSnackBarRef: MatSnackBarRef<AlertComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: Alert) {
    this.timer = data.duration;
  }

  ngOnInit() {
    if (this.timer) {
      setTimeout(() => {
        this.closeBottomSheet();
      }, this.timer);
    }
  }

  closeBottomSheet() {
    this.matSnackBarRef.dismiss();
  }
}
