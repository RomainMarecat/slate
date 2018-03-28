import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageUploadComponent } from './storage-upload/storage-upload.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AngularFireStorageModule,
    MatProgressBarModule
  ],
  declarations: [StorageUploadComponent],
  exports: [StorageUploadComponent]
})
export class StorageModule { }
