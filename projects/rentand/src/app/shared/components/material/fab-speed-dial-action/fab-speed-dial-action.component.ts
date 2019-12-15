import { AfterContentInit, Component, ContentChildren, QueryList } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { FabSpeedDialService } from '../../../services/fab-speed-dial.service';

const Z_INDEX_ITEM = 23;

@Component({
  selector: 'app-fab-speed-dial-action',
  templateUrl: './fab-speed-dial-action.component.html',
  styleUrls: ['./fab-speed-dial-action.component.scss']
})
export class FabSpeedDialActionComponent implements AfterContentInit {

  @ContentChildren(MatButton) _buttons: QueryList<MatButton>;

  constructor(private fabSpeedDialService: FabSpeedDialService) {
  }

  ngAfterContentInit(): void {
    this._buttons.changes.subscribe(() => {
      this.initButtonStates();
      this.fabSpeedDialService.setActionsVisibility();
    });

    this.initButtonStates();
  }

  private initButtonStates() {
    this._buttons.toArray().forEach((button, i) => {
      // this.renderer.setElementClass(button._getHostElement(), 'app-fab-action-item', true);
      this.changeElementStyle(button._getHostElement(), 'z-index', '' + (Z_INDEX_ITEM - i));
    });
  }

  show() {
    if (this._buttons) {
      this._buttons.toArray().forEach((button, i) => {
        let transitionDelay = 0;
        let transform;
        if (this.fabSpeedDialService.getDirection() === 'scale') {
          // Incremental transition delay of 65ms for each action button
          transitionDelay = 3 + (65 * i);
          transform = 'scale(1)';
        } else {
          transform = this.getTranslateFunction('0');
        }
        this.changeElementStyle(button._getHostElement(), 'transition-delay', transitionDelay + 'ms');
        this.changeElementStyle(button._getHostElement(), 'opacity', '1');
        this.changeElementStyle(button._getHostElement(), 'transform', transform);
      });
    }
  }

  hide() {
    if (this._buttons) {
      this._buttons.toArray().forEach((button, i) => {
        let opacity = '1';
        let transitionDelay = 0;
        let transform;
        if (this.fabSpeedDialService.getAnimationMode() === 'scale') {
          transitionDelay = 3 - (65 * i);
          transform = 'scale(0)';
          opacity = '0';
        } else {
          transform = this.getTranslateFunction((55 * (i + 1) - (i * 5)) + 'px');
        }
        this.changeElementStyle(button._getHostElement(), 'transition-delay', transitionDelay + 'ms');
        this.changeElementStyle(button._getHostElement(), 'opacity', opacity);
        this.changeElementStyle(button._getHostElement(), 'transform', transform);
      });
    }
  }

  private getTranslateFunction(value: string) {
    const dir = this.fabSpeedDialService.getDirection();
    const translateFn = (dir === 'up' || dir === 'down') ? 'translateY' : 'translateX';
    const sign = (dir === 'down' || dir === 'right') ? '-' : '';
    return translateFn + '(' + sign + value + ')';
  }

  private changeElementStyle(elem: any, style: string, value: string) {
    // Find a way to create a 'wrapper' around the action button(s)
    // provided by the user, so we don't change it's style tag

    // this.renderer.setElementStyle(elem, style, value);
  }
}
