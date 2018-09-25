import { Component, OnInit } from '@angular/core';
import { MenuService } from 'shared/menu/menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private menuService: MenuService,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.translate.get('admin.title.home')
      .subscribe((trans) => {
        this.menuService.nextTitle(trans);
      });
  }

}
