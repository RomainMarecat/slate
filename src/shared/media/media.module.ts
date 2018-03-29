import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media.service';
import { StorageModule } from './storage/storage.module';
import { ImageComponent } from './image/image.component';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageCropperModule } from 'ngx-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    CloudinaryModule,
    ImageCropperModule,
    StorageModule
  ],
  declarations: [
    ImageComponent,
  ],
  exports: [
    StorageModule,
    ImageComponent,
    CloudinaryModule
  ],
  providers: [
    MediaService
  ]
})
export class MediaModule {}
