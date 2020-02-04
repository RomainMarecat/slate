import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../shared/interfaces/user';
import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs';
import { SportService } from '../../shared/services/sport.service';
import { Sport } from '../../shared/interfaces/sport';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  users$: Observable<User[]>;
  sport$: Observable<Sport>;
  locale: string = this.translateService.getBrowserLang();
  isSearchView: boolean;
  sportsLevels$ = this.sportService.sportsLevels$;
  form: FormGroup = this.getForm();

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private sportService: SportService,
              private formBuilder: FormBuilder,
              private translateService: TranslateService) {
  }

  ngOnInit() {
    this.getSport();
    this.hasSearchView();
    this.getSports();
    this.form.valueChanges.subscribe((value) => {
      this.getUsers();
    });
  }

  getForm(): FormGroup {
    return this.formBuilder.group({
      sport: this.formBuilder.control(null),
      language: this.formBuilder.control(null),
      start: this.formBuilder.control(null),
      end: this.formBuilder.control(null),
      city: this.formBuilder.control(null),
    });
  }

  getSports() {
    this.sportService.getSports(0).subscribe();
  }

  hasSearchView() {
    this.isSearchView = false;
    this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {
      if (queryParamMap.has('search')) {
        this.isSearchView = true;
      }
    });
  }

  getSport() {
    this.sportService.sport$.subscribe((sport) => {
      if (!!sport) {
        this.getUsers(sport.slug);
      }
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      if (paramMap.has('sport')) {
        this.sport$ = this.sportService.getSport(paramMap.get('sport'));

        this.getUsers(paramMap.get('sport'));
        return;
      }

      this.getUsers();
    });
  }

  getUsers(sport?: string) {
    if (sport) {
      this.form.patchValue({sport});
    }

    this.users$ = this.userService.getMonos(this.form.getRawValue());
  }
}
