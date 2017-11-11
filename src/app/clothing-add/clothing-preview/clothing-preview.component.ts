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
  // Current image size to display
  resizedImage = { height: '240', width: '240' };

  constructor() {}

  ngOnInit() {}
}
