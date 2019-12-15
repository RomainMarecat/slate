import { Component, forwardRef, HostBinding, HostListener, Inject, Input } from '@angular/core';
import { FabSpeedDialComponent } from '../fab-speed-dial/fab-speed-dial.component';

@Component({
  selector: 'app-fab-speed-dial-trigger',
  templateUrl: './fab-speed-dial-trigger.component.html',
  styleUrls: ['./fab-speed-dial-trigger.component.scss']
})
export class FabSpeedDialTriggerComponent {
  @HostBinding('class.app-spin')
  @Input() spin = false;

  _parent: any;
  //
  // constructor(
  //   @Inject(forwardRef(() => FabSpeedDialComponent)) private _parent: FabSpeedDialComponent) {
  // }

  @HostListener('click', ['$event'])
  _onClick(event: any) {
    if (!this._parent.fixed) {
      this._parent.toggle();
      event.stopPropagation();
    }
  }
}

