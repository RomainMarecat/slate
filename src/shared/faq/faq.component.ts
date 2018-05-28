import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showcase-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  panelOpenState: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
