import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerComponent } from './media-viewer/media-viewer.component';
import { MediaService } from './media.service';
import { CloudinaryModule } from './../cloudinary/cloudinary.module';

@NgModule({
  imports: [
    CommonModule,
    CloudinaryModule
  ],
  declarations: [MediaViewerComponent],
  exports: [MediaViewerComponent],
  providers: [
    MediaService
  ]
})
export class MediaModule {}
