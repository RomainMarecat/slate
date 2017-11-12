import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appClTransformation]'
})
export class CloudinaryTransformationDirective {

  constructor(private el: ElementRef) {}

  getAttributes(): NamedNodeMap {
    return this.el.nativeElement.attributes;
  }
}
