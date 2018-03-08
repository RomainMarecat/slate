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
            link: '/admin/material/form/component/autocomplete',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Checkbox',
            link: '/admin/material/form/component/checkbox',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Datepicker',
            link: '/admin/material/form/component/datepicker',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Input',
            link: '/admin/material/form/component/input',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Radio Button',
            link: '/admin/material/form/component/radio-button',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Select',
            link: '/admin/material/form/component/select',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Slider',
            link: '/admin/material/form/component/slider',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Slide toggle',
            link: '/admin/material/form/component/slide-toggle',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
        ]
      },
      {
        title: 'Navigation',
        groups: [{
            title: 'Menu',
            link: '/admin/material/navigation/component/menu',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Sidenav',
            link: '/admin/material/navigation/component/sidenav',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Toolbar',
            link: '/admin/material/navigation/component/toolbar',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
        ]
      },
      {
        title: 'Layout',
        groups: [{
            title: 'Card',
            link: '/admin/material/layout/component/card',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Divider',
            link: '/admin/material/layout/component/divider',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Expansion Panel',
            link: '/admin/material/layout/component/expansion-panel',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Grid list',
            link: '/admin/material/layout/component/grid-list',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'List',
            link: '/admin/material/layout/component/list',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Stepper',
            link: '/admin/material/layout/component/stepper',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Tabs',
            link: '/admin/material/layout/component/tabs',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Buttons & Indicators',
        groups: [{
            title: 'Button',
            link: '/admin/material/button-indicators/component/button',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Button Toggle',
            link: '/admin/material/button-indicators/component/button-toggle',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Chips',
            link: '/admin/material/button-indicators/component/chips',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Icon',
            link: '/admin/material/button-indicators/component/icon',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Progress spinner',
            link: '/admin/material/button-indicators/component/progress-spinner',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Progress bar',
            link: '/admin/material/button-indicators/component/progress-bar',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Popups & Modals',
        groups: [{
            title: 'Dialog',
            link: '/admin/material/popup/component/dialog',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Snackbar',
            link: '/admin/material/popup/component/snackbar',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Tooltip',
            link: '/admin/material/popup/component/tooltip',
            image: '/assets/images/hockey/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Datatable',
        groups: [{
            title: 'Paginator',
            link: '/admin/material/datatable/component/paginator',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Sort header',
            link: '/admin/material/datatable/component/sort-header',
            image: '/assets/images/hockey/icons/apple-icon.png'
          },
          {
            title: 'Table',
            link: '/admin/material/datatable/component/table',
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
