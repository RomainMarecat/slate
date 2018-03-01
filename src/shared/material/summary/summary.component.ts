import { Component, OnInit } from '@angular/core';

export class MaterialModule {
  title: string;
  groups: Array < MaterialComponent >
}

export class MaterialComponent {
  title: string;
  link: string;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  materialsModules: Array < MaterialModule > = [];

  constructor() {}

  ngOnInit() {
    this.materialsModules = [{
        title: 'Form Controls',
        groups: [{
            title: 'Autocomplete',
            link: ''
          },
          {
            title: 'Checkbox',
            link: ''
          },
          {
            title: 'Dqtepicker',
            link: ''
          },
          {
            title: 'Input',
            link: ''
          },
          {
            title: 'Radio Button',
            link: ''
          },
          {
            title: 'Select',
            link: ''
          },
          {
            title: 'Slider',
            link: ''
          },
          {
            title: 'Slide toggle',
            link: ''
          },
        ]
      },
      {
        title: 'Navigation',
        groups: [{
            title: 'Menu',
            link: ''
          },
          {
            title: 'Sidenav',
            link: ''
          },
          {
            title: 'Toolbar',
            link: ''
          },
        ]
      },
      {
        title: 'Layout',
        groups: [{
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          }
        ]
      },
      {
        title: 'Form Controls',
        groups: [{
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          }
        ]
      },
      {
        title: 'Form Controls',
        groups: [{
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          },
          {
            title: '',
            link: ''
          }
        ]
      }
    ];
  }
}
