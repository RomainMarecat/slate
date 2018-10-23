import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../menu/menu.service';

@Component({
  selector: 'app-alr-cms-detail',
  templateUrl: './cms-detail.component.html',
  styleUrls: ['./cms-detail.component.scss']
})
export class CmsDetailComponent implements OnInit {

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.nextTitle('cms');
  }

}
