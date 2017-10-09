import { Component, OnInit } from '@angular/core';
import { ClothingService } from './../shared/clothing.service';
import { Clothing } from './../shared/clothing';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'clothing-list',
  templateUrl: './clothing-list.component.html',
  styleUrls: ['./clothing-list.component.scss']
})
export class ClothingListComponent implements OnInit {
  clothes$: Observable<Clothing[]>;

  constructor(private clothingService: ClothingService) { }

  ngOnInit() {
    this.clothes$ = this.clothingService.getClothes();
  }

}
