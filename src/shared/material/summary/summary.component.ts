import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

export class MaterialModule {
  title: string;
  groups: Array<MaterialComponent>;
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
  materialsModules: Array<MaterialModule> = [];

  constructor() {
  }

  ngOnInit() {
    this.materialsModules = [{
      title: 'Form Controls',
      groups: [{
        title: 'Autocomplete',
        link: '/material/form/component/autocomplete',
        image: '/assets/images/icons/apple-icon.png'
      },
        {
          title: 'Checkbox',
          link: '/material/form/component/checkbox',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Datepicker',
          link: '/material/form/component/datepicker',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Input',
          link: '/material/form/component/input',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Radio Button',
          link: '/material/form/component/radio-button',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Select',
          link: '/material/form/component/select',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Slider',
          link: '/material/form/component/slider',
          image: '/assets/images/icons/apple-icon.png'
        },
        {
          title: 'Slide toggle',
          link: '/material/form/component/slide-toggle',
          image: '/assets/images/icons/apple-icon.png'
        },
      ]
    },
      {
        title: 'Navigation',
        groups: [{
          title: 'Menu',
          link: '/material/navigation/component/menu',
          image: '/assets/images/icons/apple-icon.png'
        },
          {
            title: 'Sidenav',
            link: '/material/navigation/component/sidenav',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Toolbar',
            link: '/material/navigation/component/toolbar',
            image: '/assets/images/icons/apple-icon.png'
          },
        ]
      },
      {
        title: 'Layout',
        groups: [{
          title: 'Card',
          link: '/material/layout/component/card',
          image: '/assets/images/icons/apple-icon.png'
        },
          {
            title: 'Divider',
            link: '/material/layout/component/divider',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Expansion Panel',
            link: '/material/layout/component/expansion-panel',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Grid list',
            link: '/material/layout/component/grid-list',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'List',
            link: '/material/layout/component/list',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Stepper',
            link: '/material/layout/component/stepper',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Tabs',
            link: '/material/layout/component/tabs',
            image: '/assets/images/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Buttons & Indicators',
        groups: [{
          title: 'Button',
          link: '/material/button-indicators/component/button',
          image: '/assets/images/icons/apple-icon.png'
        },
          {
            title: 'Button Toggle',
            link: '/material/button-indicators/component/button-toggle',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Chips',
            link: '/material/button-indicators/component/chips',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Icon',
            link: '/material/button-indicators/component/icon',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Progress spinner',
            link: '/material/button-indicators/component/progress-spinner',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Progress bar',
            link: '/material/button-indicators/component/progress-bar',
            image: '/assets/images/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Popups & Modals',
        groups: [{
          title: 'Dialog',
          link: '/material/popup/component/dialog',
          image: '/assets/images/icons/apple-icon.png'
        },
          {
            title: 'Snackbar',
            link: '/material/popup/component/snackbar',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Tooltip',
            link: '/material/popup/component/tooltip',
            image: '/assets/images/icons/apple-icon.png'
          }
        ]
      },
      {
        title: 'Datatable',
        groups: [{
          title: 'Paginator',
          link: '/material/datatable/component/paginator',
          image: '/assets/images/icons/apple-icon.png'
        },
          {
            title: 'Sort header',
            link: '/material/datatable/component/sort-header',
            image: '/assets/images/icons/apple-icon.png'
          },
          {
            title: 'Table',
            link: '/material/datatable/component/table',
            image: '/assets/images/icons/apple-icon.png'
          }
        ]
      }
    ];

    this.carouselMaterialComponents = {
      grid: {xs: 1, sm: 3, md: 4, lg: 6, all: 230},
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
