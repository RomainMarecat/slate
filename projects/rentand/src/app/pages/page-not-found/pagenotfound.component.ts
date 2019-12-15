import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
