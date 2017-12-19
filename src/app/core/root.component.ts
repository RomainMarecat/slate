import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from '../../core/shared/user/user.service';
import { LoaderService } from '../../core/shared/loader/loader.service';
import { I18nService } from '../../core/shared/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit {

  /**
   * Root Constructor
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {}

  ngOnInit() {}
}
