import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './shared/store/app.state';
import { LoginCheck } from './shared/store/user/actions/login.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private store: Store<AppState>) {
    this.setupApplication();
  }

  setupApplication() {
    this.store.dispatch(new LoginCheck());
  }
}
