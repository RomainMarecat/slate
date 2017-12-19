import { Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

declare var Hammer: any;

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      // Add scroll auto on y. Pan-y can activate swipe left and right too
      touchAction: 'pan-y'
    });
    return mc;
  }
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    {
      // hammer instantion with custom config
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ]
})
export class HammerModule {}
