import { Component, Input, OnInit } from '@angular/core';
import { A2hsService } from '../shared/a2hs.service';

@Component({
  selector: 'app-a2hs-browser-prompt',
  templateUrl: './a2hs-browser-prompt.component.html',
  styleUrls: ['./a2hs-browser-prompt.component.scss']
})
export class A2hsBrowserPromptComponent implements OnInit {

  @Input() disable: boolean;

  constructor(public a2hs: A2hsService) {
  }

  ngOnInit() {
  }

}
