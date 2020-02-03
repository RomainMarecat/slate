import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../shared/store/app.state';
import { selectLoggedIn } from '../../../shared/store/user/selectors/user.selector';


@Component({
  selector: 'app-pipe-login',
  templateUrl: './pipe-login.component.html',
  styleUrls: ['./pipe-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipeLoginComponent implements OnInit {

  @Output()
  slideToInfosTab: EventEmitter<any> = new EventEmitter();

  authenticated$: Observable<boolean>;

  constructor(private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.authenticated$ = this.store.select(selectLoggedIn);
  }

  userLoggedIn() {
  }

  userLoggedOut() {
    this.router.navigate(['booking']);
  }
}
