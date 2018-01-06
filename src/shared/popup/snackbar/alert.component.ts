import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  // Injection of snack data to display string message
  constructor(@Inject(MAT_SNACK_BAR_DATA) public message: string) {}

  ngOnInit() {}

}
