import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContrastService {

  constructor() {
  }

  brightness(red: number, green: number, blue: number): number {
    return (red * 299 + green * 587 + blue * 114) / 1000;
  }

  brighterThan(red: number, green: number, blue: number, x: number = 105): boolean {
    return (255 - this.brightness(red, green, blue)) < x;
  }

  getOverlayColor(hexa: string): string {
    const red = parseInt(hexa.substring(1, 2), 16);
    const green = parseInt(hexa.substring(3, 2), 16);
    const blue = parseInt(hexa.substring(5, 2), 16);

    return this.brighterThan(red, green, blue) ? '#000000' : '#ffffff';
  }
}
