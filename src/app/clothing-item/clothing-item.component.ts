import { Component, OnInit, Input } from '@angular/core';
import { Clothing } from './../shared/clothing';

@Component({
  selector: 'clothing-item',
  templateUrl: './clothing-item.component.html',
  styleUrls: ['./clothing-item.component.scss']
})
export class ClothingItemComponent implements OnInit {

  @Input('clothing') clothing: Clothing;

  constructor() { }
I
  ngOnInit() {
  }

}
