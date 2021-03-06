import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AgendaComponent } from '../../shared/components/agenda/agenda.component';
import { CityTeached } from '../../shared/interfaces/city-teached';
import { MeetingPoint } from '../../shared/interfaces/meeting-point';
import { Mono } from '../../shared/interfaces/mono';
import { SportTeached } from '../../shared/interfaces/sport-teached';
import { ProfilService } from '../../shared/services/profil.service';
import { ToastService } from '../../shared/services/toast.service';
import { UserService } from '../../shared/services/user.service';
import { Cart } from '../../shared/interfaces/cart';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  mono: Mono;

  sportTeached: SportTeached;
  cityTeached: CityTeached;

  isMonoCartEmpty: boolean;

  @ViewChild(AgendaComponent, {static: true}) agendaComponent: AgendaComponent;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private toastService: ToastService,
              private translateService: TranslateService,
              private cartService: CartService,
              private changeDetectorRef: ChangeDetectorRef,
              private profilService: ProfilService) {
  }

  ngOnInit() {
    this.getCoach();

    this.profilService.mono
      .subscribe((mono: Mono) => {
        this.mono = mono;
      });

    this.profilService.sportTeached
      .subscribe((sportTeached: SportTeached) => {
        this.sportTeached = sportTeached;
      });
    this.profilService.cityTeached
      .subscribe((cityTeached: CityTeached) => {
        this.cityTeached = cityTeached;
        this.spreadMeetingPoints(cityTeached);
      });
  }

  getCoach() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (!!paramMap.has('slug')) {
        const slug = paramMap.get('slug');
        this.userService.getMonoBySlug(slug)
          .subscribe((mono: Mono) => {
            if (mono) {
              this.profilService.announceMonoChange(mono);
              this.profilService.announceSportsTeachedChange(mono.sports_teached);
              this.profilService.announceCitiesTeachedChange(mono.cities_teached);
              if (mono.sports_teached && mono.sports_teached.length) {
                this.profilService.announceSportTeachedChange(mono.sports_teached[0]);
              }
              if (mono.cities_teached && mono.cities_teached.length) {
                const cityTeached = mono.cities_teached[0];
                this.profilService.announceCityTeachedChange(cityTeached);
              }
            }
          });
      }
    });
  }

  spreadMeetingPoints(cityTeached: CityTeached) {
    if (cityTeached && cityTeached.city && cityTeached.city.meeting_points) {
      this.profilService.announceMeetingPointsChange(cityTeached.city.meeting_points);
      this.spreadMeetingPoint(cityTeached.city.meeting_points[0]);
    }
  }

  spreadMeetingPoint(meetingPoint: MeetingPoint) {
    if (meetingPoint) {
      this.profilService.announceMeetingPointChange(meetingPoint);
    }
  }
}
