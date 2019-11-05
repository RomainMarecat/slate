import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../shared/menu/menu.service';
import { UniversalService } from '../../shared/universal/universal.service';

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

  onlineSession = {
    key: null,
    session_type: {
      name: '',
      max_persons: 1,
      booking_delay: 1,
      duration: 60,
      pause: 10,
    },
    prices: [10, 20],
    date_range: {
      start: '2019-10-01',
      end: '2030-12-31',
    },
    time_range: {
      start: '08:00',
      end: '19:00',
    }
  };

  constructor(private menuService: MenuService,
              public universalService: UniversalService) {
  }

  ngOnInit() {
    this.menuService.nextTitle('');
  }

}
