import { Component, Input } from '@angular/core';
import { Media } from '../media';
import { MediaService } from '../media.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() classes: string;
  _publicId: string;
  _key: string;
  @Input() resize: any;
  media: Media;

  constructor(private mediaService: MediaService) {
  }

  get publicId(): string {
    return this._publicId;
  }

  get key(): string {
    return this._key;
  }

  @Input()
  set publicId(publicId: string) {
    this._publicId = publicId;
    if (publicId && publicId.includes('http') === false) {
      this.mediaService.filterByPublicId(publicId);
      this.mediaService.getMedias()
        .pipe(
          take(1)
        )
        .subscribe((medias: Media[]) => {
          this.media = medias[0];
        }, (err) => {
          console.error(err);
        });
    }
  }

  @Input()
  set key(key: string) {
    this._key = key;
    if (key && key.includes('http') === false) {
      this.mediaService.getMedia(key)
        .pipe(
          take(1)
        )
        .subscribe((media: Media) => {
          this.media = media;
        }, (err) => {
          console.error(err);
        });
    }
  }
}
