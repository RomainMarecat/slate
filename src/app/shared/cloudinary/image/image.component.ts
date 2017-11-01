import { Component, OnInit, Input } from '@angular/core';
import { Media } from './../../media/media';
import { MediaService } from './../../media/media.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  _publicId: string;
  @Input() resize: any;
  media: Media;
  constructor(private mediaService: MediaService) {}

  get publicId(): string {
    return this._publicId;
  }

  @Input()
  set publicId(publicId: string) {
    console.log('prev value: ', this._publicId);
    console.log('got publicId: ', publicId);
    this._publicId = publicId;
    this.mediaService.filterByPublicId(publicId)
      .subscribe((medias: Media[]) => {
        this.media = medias[0];
      }, (err) => {
        console.error(err);
      });
  }

  ngOnInit() {}

}
