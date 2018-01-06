import { Component, OnInit, Input } from '@angular/core';
import { Media } from '../../media/media';
import { MediaService } from '../../media/media.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
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
      .subscribe((media: Media) => {
        this.media = media;
      }, (err) => {
        console.error(err);
      });
  }
  ngOnInit() {}

}
