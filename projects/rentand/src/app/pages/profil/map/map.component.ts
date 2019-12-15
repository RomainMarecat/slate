import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CityTeached } from '../../../shared/interfaces/city-teached';
import { Media } from '../../../shared/interfaces/media';
import { MeetingPoint } from '../../../shared/interfaces/meeting-point';
import { Mono } from '../../../shared/interfaces/mono';
import { CityTeachedService } from '../../../shared/services/city-teached.service';
import { GoogleApisService } from '../../../shared/services/google-apis.service';

@Component({
  selector: 'app-profil-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent {
  _mono: Mono;

  @Input() set mono(mono: Mono) {
    if (mono) {
      this._mono = mono;
      this.loadCitiesTeachedByMono(mono);
    }
  }

  get mono(): Mono {
    return this._mono;
  }

  @Input() cityTeached: CityTeached;

  citiesTeached: CityTeached[];

  @Output() cityTeachedChange: EventEmitter<CityTeached> = new EventEmitter<CityTeached>();

  constructor(private googleApisService: GoogleApisService,
              private cityTeachedService: CityTeachedService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  loadCitiesTeachedByMono(mono: Mono) {
    this.cityTeachedService
      .getCitiesTeachedWithCitiesByUser(mono.id)
      .subscribe((citiesTeached: CityTeached[]) => {
        this.citiesTeached = citiesTeached.map((cityTeached: CityTeached) => {
          if (cityTeached && cityTeached.city && cityTeached.city.meeting_points) {
            cityTeached.picture = {} as Media;
            cityTeached.picture.url = this.googleApisService.getPlaceMapPicUrl(
              cityTeached.city.lat,
              cityTeached.city.lng,
              cityTeached.city.meeting_points.map((meetingPoint: MeetingPoint) => {
                return {
                  lat: meetingPoint.lat,
                  lng: meetingPoint.lng,
                  label: meetingPoint.title
                };
              })
            );
          }
          return cityTeached;
        });

        this.changeDetectorRef.detectChanges();
      });
  }
}
