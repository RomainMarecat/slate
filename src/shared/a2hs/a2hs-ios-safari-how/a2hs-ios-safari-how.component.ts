import { Component, Input, OnInit } from '@angular/core';
import { A2hsService } from '../shared/a2hs.service';

@Component({
  selector: 'app-a2hs-ios-safari-how',
  templateUrl: './a2hs-ios-safari-how.component.html',
  styleUrls: ['./a2hs-ios-safari-how.component.scss']
})
export class A2hsIosSafariHowComponent implements OnInit {

  @Input() disable: boolean;

  constructor(public a2hs: A2hsService) {
  }

  ngOnInit() {
  }

}
