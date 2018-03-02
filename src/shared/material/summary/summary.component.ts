import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

export class MaterialModule {
  title: string;
  groups: Array < MaterialComponent > ;
}

export class MaterialComponent {
  title: string;
  link: string;
  image: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  carouselMaterialComponents: NgxCarousel;
  materialsModules: Array < MaterialModule > = [];

  constructor() {}

  ngOnInit() {
    this.materialsModules = [{
        title: 'Form Controls',
        groups: [{
            title: 'Autocomplete',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Checkbox',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Datepicker',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Input',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Radio Button',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Select',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Slider',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Slide toggle',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
        ]
      },
      {
        title: 'Navigation',
        groups: [{
            title: 'Menu',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Sidenav',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Toolbar',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
        ]
      },
      {
        title: 'Layout',
        groups: [{
            title: 'Card',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Divider',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Expansion Panel',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Grid list',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'List',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Stepper',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Tabs',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Buttons & Indicators',
        groups: [{
            title: 'Button',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Button Toggle',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Chips',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Icon',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Progress spinner',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Progress bar',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Popups & Modals',
        groups: [{
            title: 'Dialog',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Snackbar',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Tooltip',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Datatable',
        groups: [{
            title: 'Paginator',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Sort header',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Table',
            link: '',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      }
    ];

    this.carouselMaterialComponents = {
      grid: { xs: 1, sm: 3, md: 4, lg: 6, all: 230 },
      speed: 600,
      interval: 3000,
      point: {
        visible: false
      },
      load: 2,
      touch: true
    };
  }
}
