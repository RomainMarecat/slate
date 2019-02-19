import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Slider } from './shared/slider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  sliders: Slider[] = [
    {
      title: 'magazines',
      image: '/assets/images/bg-1.jpg',

    }, {
      title: 'shopping',
      image: '/assets/images/bg-2.jpg'
    }
  ];

  constructor(public router: Router,
              private localizeService: LocalizeRouterService) {
  }

  ngOnInit() {
  }
}
