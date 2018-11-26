import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Media } from '../../media';
import { MediaService } from '../../media.service';
import { DocumentReference } from '@firebase/firestore-types';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from '../../../popup/alert.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-storage-upload',
  templateUrl: './storage-upload.component.html',
  styleUrls: ['./storage-upload.component.scss']
})
export class StorageUploadComponent implements OnInit {

  @Input() folder: string;
  @Input() xs: boolean;
  @Input() metadata: any;
  @Input() displayDownloadUrl: boolean;

  @Output() imageRefChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() imageChanged: EventEmitter<Media> = new EventEmitter<Media>();
  @Input() downloadURL: string;
  _mediaId: string;
  storageRef: AngularFireStorageReference;
  uploadPercent: number;

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

    const ref = this.storage.ref(filePath);
    const imageRef: AngularFireUploadTask = this.storage.upload(
      filePath,
      file,
      {
        ...{
          cacheControl: 'public,max-age=7200',
          contentType: 'image/jpeg',
        },
        ...{customMetadata: this.metadata}
      });

    imageRef
      .catch(() => {
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
          ref.updateMetatdata(this.metadata)
            .subscribe((metadata) => {
              console.log(this.metadata, metadata);
            });

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

  @Input() set media(mediaId: string) {
    this._mediaId = mediaId;
    if (mediaId) {
      this.mediaService.getMedia(mediaId)
        .subscribe((media: Media) => {
          this.getDownloadURL(media.public_id);
        });
    }
  }

  getDownloadURL(path: string) {
    this.storageRef = this.storage.ref(path);
    this.storageRef.getDownloadURL()
      .pipe(
        take(1)
      )
      .subscribe(downloadURL => {
        this.downloadURL = downloadURL;
        this.uploadPercent = 100;
      });
  }


  get media(): string {
    return this._mediaId;
  }
}
