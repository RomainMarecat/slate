import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageUploadComponent } from './storage-upload/storage-upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatButtonModule, MatIcon, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    AngularFireStorageModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    TranslateModule,
  ],
  declarations: [
    StorageUploadComponent,
    StorageDetailComponent
  ],
  exports: [
    StorageUploadComponent,
    StorageDetailComponent
  ]
})
export class StorageModule {
}
