import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Component({
  selector: 'app-storage-upload',
  templateUrl: './storage-upload.component.html',
  styleUrls: [ './storage-upload.component.scss' ]
})
export class StorageUploadComponent implements OnInit {

  @Input() folder: string;
  @Input() metadata: any;

  @Output() imageRefChanged: EventEmitter<any> = new EventEmitter<any>();

  uploadPercent: number;
  downloadURL: string;

  constructor(private storage: AngularFireStorage) {
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

    imageRef.then((taskSnapshot) => {
      console.log('task', taskSnapshot);
      this.imageRefChanged.emit(taskSnapshot);
    });
  }
}
