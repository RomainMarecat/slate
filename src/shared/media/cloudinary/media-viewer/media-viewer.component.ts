import { Component, OnInit, Input } from '@angular/core';
import { MediaService } from '../../media.service';
import { Media } from '../../media';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-media-viewer',
  templateUrl: './media-viewer.component.html',
  styleUrls: ['./media-viewer.component.scss'],
})
export class MediaViewerComponent implements OnInit {
  @Input() key: string;
  media: Media;
  @Input() resize: any;

  constructor(private mediaService: MediaService) {
  }

  ngOnInit() {
    if (this.key && this.key.indexOf('http') === -1) {
      this.mediaService.getMedia(this.key)
        .pipe(
          take(1)
        )
        .subscribe((media: Media) => {
          this.media = media;
        }, (err) => console.error(err));
    }
  }
}
