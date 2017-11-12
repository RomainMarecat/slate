import { Component, OnInit } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { UserService } from './../shared/user/user.service';
import { LoaderService } from './../shared/loader/loader.service';

@Component({
  selector: 'app-clothing-index',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

  /**
   * Root Constructor
   * @param {Angulartics2GoogleAnalytics} private angulartics2GoogleAnalytics
   * @param {UserService}                 public  userService
   * @param {LoaderService}               private loaderService
   */
  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    public userService: UserService, private loaderService: LoaderService) {}

  ngOnInit() {}
}
