import { Component, OnInit } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { UserService } from './../shared/user/user.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-clothing-index',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

  constructor(private angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics, public userService: UserService) {}

  ngOnInit() {}

}
