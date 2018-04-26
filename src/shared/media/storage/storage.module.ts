import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageUploadComponent } from './storage-upload/storage-upload.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatIcon, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireStorageModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule
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
