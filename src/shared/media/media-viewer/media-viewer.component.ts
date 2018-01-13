import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MediaService } from './../media.service';
import { Media } from './../media';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.scss'],
})
export class MediaViewerComponent implements OnInit {
  @Input('key') key: string;
  media: Media;
  @Input('resize') resize: any;

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    if (this.key && this.key.indexOf('http') === -1) {
      console.log('enterMediaviewer');
      this.mediaService.getMedia(this.key)
        .subscribe((media: Media) => {
          console.log('then', media);
          this.media = media;
        }, (err) => console.log(err));
    }
  }
}
