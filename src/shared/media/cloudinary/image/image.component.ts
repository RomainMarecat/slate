import { Component, EventEmitter, Input, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Media } from '../../media';
import { MediaService } from '../../media.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() panelClass: string | object;
  @Input() panelStyle: string | object;
  @Input() matCardImage: boolean;
  _publicId: string;
  _key: string;
  @Input() alt: string;
  @Input() resize: any;
  media: Media;
  @Output() mediaLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() mediaErrored: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private mediaService: MediaService) {
  }

  get publicId(): string {
    return this._publicId;
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
          if (this.media) {
            this.mediaLoaded.emit(true);
          }
        }, () => {
          this.mediaErrored.emit(true);
        });
    }
  }

  get key(): string {
    return this._key;
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
          if (media) {
            this.mediaLoaded.emit(true);
          }
        }, () => {
          this.mediaErrored.emit(true);
        });
    }
  }
}
