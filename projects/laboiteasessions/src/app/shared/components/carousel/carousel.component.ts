import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sport } from '../../interfaces/sport';
import { SportService } from '../../services/sport.service';
import { NguCarouselConfig } from '@ngu/carousel';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() sports$: Observable<Sport[]> = this.sportService.getSports(0);
  locale: string = this.translateService.getBrowserLang();


  carouselMaterialComponents: NguCarouselConfig = {
    grid: {xs: 1, sm: 3, md: 4, lg: 4, all: 230},
    speed: 600,
    animation: 'lazy',
    point: {
      visible: false
    },
    load: 2,
    touch: true
  };

  constructor(private sportService: SportService,
              private translateService: TranslateService) {
  }

  ngOnInit() {
  }

}
