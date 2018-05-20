import { Component, OnInit } from '@angular/core';

export class Feature {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-feature-style1',
  templateUrl: './feature-style1.component.html',
  styleUrls: [ './feature-style1.component.scss' ]
})
export class FeatureStyle1Component implements OnInit {

  features: Feature[] = [
    {
      title: 'feature.title1',
      icon: 'devices',
      description: 'feature.description1',
    }, {
      title: 'feature.title2',
      icon: 'subtitles',
      description: 'feature.description2',
    }, {
      title: 'feature.title3',
      icon: 'devices_other',
      description: 'feature.description3',
    }, {
      title: 'feature.title4',
      icon: 'rotate_left',
      description: 'feature.description4',
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
