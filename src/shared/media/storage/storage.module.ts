import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageUploadComponent } from './storage-upload/storage-upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { StorageImageComponent } from './storage-image/storage-image.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AngularFireStorageModule,
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  declarations: [
    StorageUploadComponent,
    StorageDetailComponent,
    StorageImageComponent
  ],
  exports: [
    StorageUploadComponent,
    StorageDetailComponent,
    StorageImageComponent
  ]
})
export class StorageModule {
}
