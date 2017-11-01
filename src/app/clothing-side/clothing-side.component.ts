import { Component, OnInit, Input } from '@angular/core';
import { IClothing } from './../shared/clothing/i-clothing';

@Component({
  selector: 'app-clothing-side',
  templateUrl: './clothing-side.component.html',
  styleUrls: ['./clothing-side.component.scss']
})
export class ClothingSideComponent implements OnInit {
  @Input() clothing: IClothing;

  constructor() {}

  ngOnInit() {}

}
