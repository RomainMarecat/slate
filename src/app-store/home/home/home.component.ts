import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryOptions: {
    display_title: boolean;
    display_subtitle: boolean;
    image_link: boolean;
    text_link: boolean;
    display_icon: boolean;
    display_image: boolean;
  } = {
    display_title: true,
    display_subtitle: true,
    image_link: true,
    text_link: true,
    display_icon: true,
    display_image: true,
  };

  constructor() {
  }

  ngOnInit() {
  }
}
