import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable
  selector: 'mat-icon',
  // tslint:enable
  template: `<span></span>`
})
export class MockMatIconComponent {

  @Input() svgIcon: any;
  @Input() fontSet: any;
  @Input() fontIcon: any;
}
