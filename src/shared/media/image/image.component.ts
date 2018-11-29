import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Media } from '../media';
import { MediaService } from '../media.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() panelClass: string | Object;
  @Input() panelStyle: string | Object;
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
          if (this.media) {
            this.mediaLoaded.emit(true);
          }
        }, () => {
          this.mediaErrored.emit(true);
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
          if (media) {
            this.mediaLoaded.emit(true);
          }
        }, () => {
          this.mediaErrored.emit(true);
        });
    }
  }
}
