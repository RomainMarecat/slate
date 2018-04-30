import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LoaderService } from '../../shared/loader/loader.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../shared/menu/menu.service';
import { SelectionService } from '../../shared/selection/selection.service';
import { TweenMax, Circle, Cubic } from 'gsap';

@Component({
  selector: 'app-hockey-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {

  constructor(private translateService: TranslateService,
              private menuService: MenuService,
              private selectionService: SelectionService,
              private loaderService: LoaderService,
              private router: Router,
              private meta: Meta,
              private title: Title) {
  }

  ngOnInit() {
    this.translateService.get([ 'meta.title.homepage', 'meta.description.homepage' ])
      .subscribe((translations: string[]) => {
        this.meta.addTag({name: 'description', content: translations[ 'meta.description.homepage' ]});
        this.title.setTitle(translations[ 'meta.title.homepage' ]);
      });
    this.menuService.nextTitle('');
  }
}