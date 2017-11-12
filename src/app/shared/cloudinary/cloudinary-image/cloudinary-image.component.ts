import {
  Component,
  ElementRef,
  Input,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Cloudinary } from './../cloudinary.service';
import { CloudinaryTransformationDirective } from './../cloudinary-transformation.directive';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cloudinary-image',
  templateUrl: './cloudinary-image.component.html',
  styleUrls: ['./cloudinary-image.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CloudinaryImageComponent implements AfterViewInit, OnInit, OnDestroy {

  @Input('publicId') publicId: string;

  @ContentChildren(CloudinaryTransformationDirective)
  transformations: QueryList < CloudinaryTransformationDirective > ;

  observer: MutationObserver;
  // Default loading image offset in ms
  offset: number;
  defaultImageSplashScreen: string;
  imageSource$: Observable < string > ;

  constructor(private el: ElementRef, private cloudinary: Cloudinary) {
    this.offset = 3000;
    this.defaultImageSplashScreen = '/assets/images/icons/apple-icon.png';
  }

  ngOnInit(): void {
    // Create an observer instance
    this.observer = new MutationObserver(() => {
      this.loadImage(true);

    });
    // Observe changes to attributes or child transformations to re-render the image
    const config = { attributes: true, childList: true };

    // pass in the target node, as well as the observer options
    this.observer.observe(this.el.nativeElement, config);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  ngAfterViewInit() {
    this.loadImage(false);
  }

  loadImage(lazyLoad: boolean) {
    if (!this.publicId) {
      throw new Error(
        'You must set the public id of the image to load, e.g. <app-cloudinary-image' +
        'publicId={{photo.public_id}}...></app-cloudinary-image>'
      );
    }
    const nativeElement = this.el.nativeElement;
    const image = nativeElement.children[0];
    const options = this.cloudinary.toCloudinaryAttributes(nativeElement.attributes, this.transformations);

    const imageTag = this.cloudinary.imageTag(this.publicId, options);
    this.setElementAttributes(image, imageTag.attributes(), lazyLoad);
    if (options.responsive) {
      this.cloudinary.responsive(image, options);
    }
  }

  setElementAttributes(element: Element, attributesLiteral: string[], lazyLoad: boolean) {
    if (lazyLoad) {
      this.imageSource$ = Observable.of(attributesLiteral['src']);
    }
    Object.keys(attributesLiteral).forEach(attrName => {
      if (attrName !== 'src') {
        element.setAttribute(attrName, attributesLiteral[attrName]);
      }
    });
  }
}
