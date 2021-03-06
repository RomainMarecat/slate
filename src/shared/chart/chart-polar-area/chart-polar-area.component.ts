import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-polar-area',
  templateUrl: './chart-polar-area.component.html',
  styleUrls: [ './chart-polar-area.component.scss' ]
})
export class ChartPolarAreaComponent implements OnInit {
  // PolarArea
  public polarAreaChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales' ];
  public polarAreaChartData: number[] = [ 300, 500, 100, 40, 120 ];
  public polarAreaLegend = true;

  public polarAreaChartType = 'polarArea';

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }

  constructor() {
  }

  ngOnInit() {
  }

}
