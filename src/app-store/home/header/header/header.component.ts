import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Slider } from './shared/slider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() slidersOptions: {sliders: Slider[]};

  constructor(public router: Router,
              private localizeService: LocalizeRouterService) {
  }

  ngOnInit() {
  }
}
