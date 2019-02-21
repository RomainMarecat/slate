import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadMetadata } from '@angular/fire/storage/interfaces';

export class MockAngularFireStorage {
  ref(path: string): AngularFireStorageReference {
    return null;
  }

  upload(path: string, data: any, metadata?: UploadMetadata): AngularFireUploadTask {
    return null;
  }
}
