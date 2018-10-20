import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Media } from '../../media';
import { MediaService } from '../../media.service';
import { DocumentReference } from '@firebase/firestore-types';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';

@Component({
  selector: 'app-storage-upload',
  templateUrl: './storage-upload.component.html',
  styleUrls: ['./storage-upload.component.scss']
})
export class StorageUploadComponent implements OnInit {

  @Input() folder: string;
  @Input() metadata: any;
  @Input() displayDownloadUrl: boolean;

  @Output() imageRefChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageChanged: EventEmitter<Media> = new EventEmitter<Media>();
  uploadPercent: number;
  downloadURL: string;

  constructor(private storage: AngularFireStorage,
              private mediaService: MediaService,
              private alertService: AlertService,
              private translate: TranslateService) {
    this.displayDownloadUrl = true;
  }

  ngOnInit() {
  }

  uploadFile(event: any) {
    this.uploadPercent = 0;
    const file = event.target.files[0];
    const filePath = (this.folder ? this.folder + '/' : '') + event.target.files[0].name;
    let imageRef: AngularFireUploadTask = null;
    if (this.metadata) {
      const ref = this.storage.ref(filePath);
      imageRef = ref.put(file, {customMetadata: this.metadata});
    } else {
      imageRef = this.storage.upload(filePath, file);
    }

    imageRef
      .catch((error) => {
        this.translate.get('error.upload.retry')
          .subscribe((translated) => {
            this.alertService.toast(translated);
          });
      });

    // observe percentage changes
    imageRef.percentageChanges().subscribe(percent => this.uploadPercent = percent);

    // get notified when the download URL is available
    imageRef.then((taskSnapshot) => {
      this.imageRefChanged.emit(taskSnapshot);
      taskSnapshot.ref.getDownloadURL()
        .then(((downloadURL) => {
          this.downloadURL = downloadURL;

          const media: Media = {
            public_id: taskSnapshot.metadata.fullPath,
            bucket: taskSnapshot.metadata.bucket,
            content_type: taskSnapshot.metadata.contentType,
            created_at: taskSnapshot.metadata.timeCreated,
            updated_at: taskSnapshot.metadata.updated,
            url: downloadURL,
            type: 'storage',
            alt: taskSnapshot.metadata.customMetadata && taskSnapshot.metadata.customMetadata.alt ?
              taskSnapshot.metadata.customMetadata.alt : null,
            extension: taskSnapshot.metadata.fullPath.substring(
              taskSnapshot.metadata.fullPath.lastIndexOf('.') + 1, taskSnapshot.metadata.fullPath.length
            ),
            public: true,
          };
          this.onMediaChange(media);

        }));
    });
  }

  deleteImage() {
    this.downloadURL = null;
    // + emit delete media on form
  }

  /**
   * Propagate new media to parent
   */
  onMediaChange(media: Media) {
    this.mediaService.createMedia(media)
      .then((doc: DocumentReference) => {
        media.key = doc.id;
        this.imageChanged.emit(media);
        this.uploadPercent = null;
      }, (err) => {
        console.error('onMediaChange:addMedia:err', err);
      });
  }
}
