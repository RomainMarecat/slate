import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  _publicId: string;
  _key: string;
  @Input() resize: any;
  media: Media;

  constructor(private mediaService: MediaService) {}

  get publicId(): string {
    return this._publicId;
  }

  get key(): string {
    return this._key;
  }

  @Input()
  set publicId(publicId: string) {
    this._publicId = publicId;
    this.mediaService.filterByPublicId(publicId)
      .take(1)
      .subscribe((medias: Media[]) => {
        this.media = medias[0];
      }, (err) => {
        console.error(err);
      });
  }

  @Input()
  set key(key: string) {
    this._key = key;
    this.mediaService.getMedia(key)
      .take(1)
      .subscribe((media: Media) => {
        this.media = media;
      }, (err) => {
        console.error(err);
      });
  }
}
