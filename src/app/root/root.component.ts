import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from './../shared/user/user.service';
import { LoaderService } from './../shared/loader/loader.service';
import { I18nService } from './../shared/i18n/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class AppRootComponent implements OnInit {

  /**
   * Root Constructor
   * @param {Angulartics2GoogleAnalytics} private angulartics2GoogleAnalytics
   * @param {UserService}                 public  userService
   * @param {LoaderService}               private loaderService
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    public userService: UserService, private loaderService: LoaderService,
    private i18nService: I18nService) {}

  ngOnInit() {}
}
