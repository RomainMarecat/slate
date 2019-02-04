import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Cloudinary } from './cloudinary.service';
import { CloudinaryImageComponent } from './cloudinary-image/cloudinary-image.component';
import { CloudinaryVideoComponent } from './cloudinary-video/cloudinary-video.component';
import { CloudinaryTransformationDirective } from './cloudinary-transformation.directive';
import { CloudinaryImageSourceDirective } from './cloudinary-image-source.directive';
import CloudinaryConfiguration from './cloudinary-configuration.class';
import { CloudinaryTagService } from './cloudinary-tag.service';
import { ImageCropperModule } from 'ngx-img-cropper';
import { NgPipesModule } from 'ngx-pipes';
import { CloudinaryUploadService } from './cloudinary-upload.service';
import { ImageProductComponent } from './image-product/image-product.component';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import { Angulartics2Module } from 'angulartics2';
import { TranslateModule } from '@ngx-translate/core';
import { FileUploadModule } from 'ng2-file-upload';

export { Cloudinary, provideCloudinary } from './cloudinary.service';

export const CLOUDINARY_LIB = new InjectionToken<any>('CLOUDINARY_LIB');
export const CLOUDINARY_CONFIGURATION = new InjectionToken<CloudinaryConfiguration>('CLOUDINARY_CONFIGURATION');

export { CloudinaryConfiguration };

// Export this function to Angular's AOT to work
export function createCloudinary(cloudinaryJsLib: any, configuration: CloudinaryConfiguration) {
  return new Cloudinary(cloudinaryJsLib, configuration);
}

@NgModule({
  imports: [
    Angulartics2Module,
    CommonModule,
    FileUploadModule,
    ImageCropperModule,
    NgPipesModule,
    TranslateModule
  ],
  declarations: [
    CloudinaryImageSourceDirective,
    CloudinaryImageComponent,
    CloudinaryTransformationDirective,
    CloudinaryVideoComponent,
    ImageProductComponent,
    MediaViewerComponent
  ],
  exports: [
    CloudinaryImageSourceDirective,
    CloudinaryImageComponent,
    CloudinaryVideoComponent,
    CloudinaryTransformationDirective,
    ImageProductComponent,
    MediaViewerComponent
  ]
})
export class CloudinaryModule {
  static forRoot(cloudinaryJsLib: any, cloudinaryConfiguration: CloudinaryConfiguration): ModuleWithProviders {
    return {
      ngModule: CloudinaryModule,
      providers: [
        CloudinaryTagService,
        CloudinaryUploadService,
        {provide: CLOUDINARY_LIB, useValue: cloudinaryJsLib},
        {provide: CLOUDINARY_CONFIGURATION, useValue: cloudinaryConfiguration},
        {
          provide: Cloudinary,
          useFactory: createCloudinary,
          deps: [ CLOUDINARY_LIB, CLOUDINARY_CONFIGURATION ]
        }
      ]
    };
  }
}
