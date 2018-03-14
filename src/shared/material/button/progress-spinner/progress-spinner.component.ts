import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: [ './progress-spinner.component.scss' ]
})
export class ProgressSpinnerComponent implements OnInit {

  color: string;
  mode: any;
  value: any;

  constructor() {
  }

  ngOnInit() {
  }

}
