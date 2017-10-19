import { Component, OnInit, Input } from '@angular/core';
import { IClothing } from './../../shared/clothing/i-clothing';

@Component({
  selector: 'app-clothing-preview',
  templateUrl: './clothing-preview.component.html',
  styleUrls: ['./clothing-preview.component.scss']
})
export class ClothingPreviewComponent implements OnInit {
  @Input() clothing: IClothing;
  @Input() user: any;
  resizedImage = { height: "140", width: "140" };

  constructor() {}

  ngOnInit() {}

  showDetail() {

  }

}
