import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageUploadComponent } from './storage-upload/storage-upload.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { StorageDetailComponent } from './storage-detail/storage-detail.component';
import { TranslateModule } from '@ngx-translate/core';
import { StorageImageComponent } from './storage-image/storage-image.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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
