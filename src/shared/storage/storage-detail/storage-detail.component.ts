import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from 'angularfire2/storage';

@Component({
  selector: 'app-storage-detail',
  templateUrl: './storage-detail.component.html',
  styleUrls: [ './storage-detail.component.scss' ]
})
export class StorageDetailComponent implements OnInit {

  _downloadURL: string;

  storageRef: AngularFireStorageReference;

  _path: string;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
  }

  @Input('path') set path(path) {
    this._path = path;
    this.getDownloadURL(path);
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

  getDownloadURL(path: string) {
    this.storageRef = this.storage.ref(path);
    this.storageRef.getDownloadURL()
      .take(1)
      .subscribe(downloadURL = this._downloadURL = downloadURL);
  }
}
