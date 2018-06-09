import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.component.html',
  styleUrls: [ './storage-detail.component.scss' ]
})
export class StorageDetailComponent implements OnInit {

  @Input() classes: string;

  @Input() height: string;

  @Input() width: string;

  _downloadURL: string;

  _metadata: any;

  storageRef: AngularFireStorageReference;

  _path: string;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
  }

  @Input('path') set path(path) {
    this._path = path;
    this.getDownloadURL(path);
    this.getMetadata(path);
  }

  @Input('downloadURL') set downloadURL(downloadURL) {
    this._downloadURL = downloadURL;
  }

  get downloadURL() {
    return this._downloadURL;
  }

  get path(): string {
    return this._path;
  }

  get metadata() {
    return this._metadata;
  }

  getDownloadURL(path: string) {
    this.storageRef = this.storage.ref(path);
    this.storageRef.getDownloadURL()
      .pipe(
        take(1)
      )
      .subscribe(downloadURL => this._downloadURL = downloadURL);
  }

  getMetadata(path: string) {
    this.storageRef = this.storage.ref(path);
    this.storageRef.getMetadata()
      .pipe(
        take(1)
      )
      .subscribe(metadata => this._metadata = metadata);
  }
}
