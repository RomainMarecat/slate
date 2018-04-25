import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { UploadTaskSnapshot } from '@firebase/storage-types';
import { Media } from '../../media';
import { MediaService } from '../../media.service';
import { DocumentReference } from '@firebase/firestore-types';

@Component({
  selector: 'app-storage-upload',
  templateUrl: './storage-upload.component.html',
  styleUrls: [ './storage-upload.component.scss' ]
})
export class StorageUploadComponent implements OnInit {

  @Input() folder: string;
  @Input() metadata: any;
  @Input() displayDownloadUrl: boolean;

  @Output() imageRefChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageChanged: EventEmitter<Media> = new EventEmitter<Media>();
  uploadPercent: number;
  downloadURL: string;

  constructor(private storage: AngularFireStorage, private mediaService: MediaService) {
    this.displayDownloadUrl = true;
  }

  ngOnInit() {
  }

  uploadFile(event: any) {
    this.uploadPercent = 0;
    const file = event.target.files[ 0 ];
    const filePath = (this.folder ? this.folder + '/' : '') + event.target.files[ 0 ].name;
    let imageRef: AngularFireUploadTask = null;
    if (this.metadata) {
      const ref = this.storage.ref(filePath);
      imageRef = ref.put(file, {customMetadata: this.metadata});
    } else {
      imageRef = this.storage.upload(filePath, file);
    }

    // observe percentage changes
    imageRef.percentageChanges().subscribe(percent => this.uploadPercent = percent);
    // get notified when the download URL is available
    imageRef.downloadURL().subscribe(downloadURL => this.downloadURL = downloadURL);

    imageRef.then((taskSnapshot: UploadTaskSnapshot) => {
      this.imageRefChanged.emit(taskSnapshot);
      const media: Media = {
        public_id: taskSnapshot.metadata.fullPath,
        bucket: taskSnapshot.metadata.bucket,
        content_type: taskSnapshot.metadata.contentType,
        created_at: taskSnapshot.metadata.timeCreated,
        updated_at: taskSnapshot.metadata.updated,
        url: taskSnapshot.downloadURL,
        type: 'storage',
        alt: taskSnapshot.metadata.customMetadata.alt,
        extension: taskSnapshot.metadata.fullPath.substring(
          taskSnapshot.metadata.fullPath.lastIndexOf('.') + 1, taskSnapshot.metadata.fullPath.length
        ),
        public: true,
      };

      this.onMediaChange(media);
    });
  }

  /**
   * Propagate new media to parent
   * @param {Media} media
   */
  onMediaChange(media: Media) {
    this.mediaService.addMedia(media)
      .then((doc: DocumentReference) => {
        media.key = doc.id;
        this.imageChanged.emit(media);
      }, (err) => {
        console.error('onMediaChange:addMedia:err', err);
      });
  }
}
