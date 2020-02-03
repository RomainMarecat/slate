import { ContentChild, forwardRef, Inject, Injectable } from '@angular/core';
import { FabSpeedDialActionComponent } from '../components/material/fab-speed-dial-action/fab-speed-dial-action.component';
import { FabSpeedDialComponent } from '../components/material/fab-speed-dial/fab-speed-dial.component';

@Injectable({
  providedIn: 'root'
})
export class FabSpeedDialService {

  // @ContentChild(FabSpeedDialActionComponent, {static: false}) _childActions: FabSpeedDialActionComponent;

  // constructor(@Inject(forwardRef(() => FabSpeedDialComponent))
  //             private _parent: FabSpeedDialComponent) {
  // }

  show() {
    // this._childActions.show();
  }

  hide() {
    // this._childActions.hide();
  }

  setActionsVisibility() {
    // this._parent.setActionsVisibility();
  }

  getAnimationMode() {
    // return this._parent.animationMode;
    return '';
  }

  getDirection() {
    // return this._parent.direction;
    return '';
  }
}
