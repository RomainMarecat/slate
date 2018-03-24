import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent implements OnInit {

  folders: any[] = [
    { name: 'WIP', updated: new Date()},
    { name: 'Desktop', updated: new Date()},
    { name: 'Download', updated: new Date()},
    { name: 'Documents', updated: new Date()},
  ];
  notes: any[] = [{name: 'Clean desk'}, {name: 'call Marco'}, {name: 'go home at 19'}];

  constructor() { }

  ngOnInit() {
  }

}
