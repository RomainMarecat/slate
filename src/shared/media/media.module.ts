import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaService } from './media.service';
import { StorageModule } from './storage/storage.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ImageCropperModule } from 'ngx-img-cropper';
import { AngularFirestore } from '@angular/fire/firestore';

const TABLE_MEDIA = new InjectionToken<string>('media');

@NgModule({
  imports: [
    CommonModule,
    CloudinaryModule,
    ImageCropperModule,
    StorageModule
  ],
  exports: [
    StorageModule,
    CloudinaryModule
  ],
  providers: [
    {provide: TABLE_MEDIA, useValue: 'media'},
    {provide: MediaService, useClass: MediaService, deps: [AngularFirestore, TABLE_MEDIA]},
  ]
})
export class MediaModule {}
