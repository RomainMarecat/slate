import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-bar',
  templateUrl: './chart-bar.component.html',
  styleUrls: [ './chart-bar.component.scss' ]
})
export class ChartBarComponent implements OnInit {
  barChartOptions: any = {
    responsive: true
  };
  barChartLabels: string[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ];
  barChartType = 'bar';
  barChartLegend = true;

  barChartData: any[] = [
    {data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A'},
    {data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B'}
  ];

  constructor() {
  }

  ngOnInit() {
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[ 0 ].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
