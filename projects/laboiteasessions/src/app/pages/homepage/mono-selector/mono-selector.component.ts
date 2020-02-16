import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';
import { Mono } from '../../../shared/interfaces/mono';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-mono-selector',
  templateUrl: './mono-selector.component.html',
  styleUrls: ['./mono-selector.component.scss'],
})
export class MonoSelectorComponent implements OnInit {

  monoListCtrl: FormControl;
  filteredMonos: any;

  monoList: Mono[] = [];
  auto: any;

  constructor(private userService: UserService,
              private router: Router) {
    this.monoListCtrl = new FormControl();
    this.filteredMonos = this.monoListCtrl.valueChanges
      .pipe(
        startWith<any, any>(null),
        map(val => this.monoList.filter((user: Mono) => {
          return val.length && ((user.user_metadata.firstname.toLowerCase().indexOf(val.toLowerCase()) >= 0
            || user.user_metadata.lastname.toLowerCase().indexOf(val.toLowerCase()) >= 0));
        }))
      );
  }

  ngOnInit() {
    this.userService.getMonos({})
      .subscribe((users: Mono[]) => {
        this.monoList = users;
      });
  }

  onMonoSelected(user: Mono) {
    if (user && user.user_metadata && user.user_metadata.slug) {
      this.router.navigate(['/profile/' + user.user_metadata.slug]);
    }
  }

  handleChoice(mono) {
    if (mono) {
      return mono.user_metadata.firstname + ' ' + mono.user_metadata.lastname;
    }
  }
}
