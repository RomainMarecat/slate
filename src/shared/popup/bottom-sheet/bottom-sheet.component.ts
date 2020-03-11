import { Component, Inject, OnInit } from '@angular/core';
import { Alert } from '../alert';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  timer: number;

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Alert) {
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
    this.bottomSheetRef.dismiss();
  }
}
