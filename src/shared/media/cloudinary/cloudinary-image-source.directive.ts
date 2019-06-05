import { Directive, ElementRef, AfterViewInit, Input, QueryList, ContentChildren } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';

@Directive({
  selector: '[appClHref], [appClSrc], [appClSrcset]'
})
export class CloudinaryImageSourceDirective implements AfterViewInit {

  @Input() clHref: string;
  @Input() clSrc: string;
  @Input() clSrcset: string;

  attrName: string;
  propertyValue: string;

  @ContentChildren(CloudinaryTransformationDirective)
  transformations: QueryList<CloudinaryTransformationDirective>;

  constructor(private el: ElementRef,
              private cloudinary: Cloudinary) {
  }

  ngAfterViewInit() {
    this.setClAttrName();
    const isSvg = this.calculateIsSvg();

    if (!this.attrName || !this.propertyValue) {
      throw new Error('Directive value is missing for clHref/clSrc/clSrcset');
    }

    const nativeElement = this.el.nativeElement;
    const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);

    const attrValue = this.cloudinary.url(this.propertyValue, options);
    this.el.nativeElement.setAttribute(this.attrName, attrValue);

    this.addIELogic(isSvg, attrValue);
  }

  addIELogic(isSvg: boolean, attrValue) {
    const msie = this.el.nativeElement.ownerDocument.documentMode;
    if (msie && !isSvg) {
      // IE logic here
      this.el.nativeElement[this.attrName] = attrValue;
    }
  }

  calculateIsSvg(): boolean {
    if (this.clHref &&
      toString.call(this.el.nativeElement['href'] === '[object SVGAnimatedString]')) {
      this.el.nativeElement.setAttribute('xlinkHref', 'xlink:href');
      return true;
    }
    return false;
  }

  setClAttrName() {
    if (this.clHref) {
      this.attrName = 'href';
      this.propertyValue = this.clHref;
    } else if (this.clSrc) {
      this.attrName = 'src';
      this.propertyValue = this.clSrc;
    } else if (this.clSrcset) {
      this.attrName = 'srcset';
      this.propertyValue = this.clSrcset;
    }
  }
}
