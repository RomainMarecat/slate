import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryImageComponent } from './cloudinary-image/cloudinary-image.component';
import { CloudinaryVideoComponent } from './cloudinary-video/cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
import CloudinaryConfiguration from './cloudinary-configuration.class';
export { CloudinaryVideoComponent } from './cloudinary-video/cloudinary-video.component';
export { CloudinaryImageComponent } from './cloudinary-image/cloudinary-image.component';
export { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
export { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
export { Cloudinary, provideCloudinary } from './cloudinary.service';
export { CloudinaryConfiguration };
import { LazyLoadImageModule } from 'ng-lazyload-image';

export const CLOUDINARY_LIB = new InjectionToken('CLOUDINARY_LIB');
export const CLOUDINARY_CONFIGURATION = new InjectionToken('CLOUDINARY_CONFIGURATION');

// Export this function to Angular's AOT to work
export function createCloudinary(cloudinaryJsLib: any, configuration: any) {
  return new Cloudinary(cloudinaryJsLib, configuration);
}

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    LazyLoadImageModule
  ],
  declarations: [
    CloudinaryImageSourceDirective,
    CloudinaryImageComponent,
    CloudinaryTransformationDirective,
    CloudinaryVideoComponent
  ],
  exports: [
    CloudinaryImageSourceDirective,
    CloudinaryImageComponent,
    CloudinaryVideoComponent,
    CloudinaryTransformationDirective
  ]
})
export class CloudinaryModule {
  static forRoot(cloudinaryJsLib: any, cloudinaryConfiguration: any): ModuleWithProviders {
    return {
      ngModule: CloudinaryModule,
      providers: [
        { provide: CLOUDINARY_LIB, useValue: cloudinaryJsLib },
        { provide: CLOUDINARY_CONFIGURATION, useValue: cloudinaryConfiguration },
        {
          provide: Cloudinary,
          useFactory: createCloudinary,
          deps: [CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION]
        }
      ]
    };
  }
}
