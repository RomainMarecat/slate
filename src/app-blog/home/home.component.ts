import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu/menu.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mapConfig = {
    lat: 45.0755137,
    lng: 5.7712538,
    zoom: 15,
    disableDefaultUI: false,
    zoomControl: false,
    streetViewControl: true,
    markerDraggable: false
  };

  constructor(private menuService: MenuService) { }

  ngOnInit() {
    this.menuService.nextTitle('');
  }

}
