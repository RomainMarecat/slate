import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';


@Component({
  selector: 'app-pipe-login',
  templateUrl: './pipe-login.component.html',
  styleUrls: ['./pipe-login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PipeLoginComponent implements OnInit {

  @Output()
  slideToInfosTab: EventEmitter<any> = new EventEmitter();

  accessAllowedToInfos = false;

  constructor(public authService: AuthService,
              private router: Router) {
    authService.isAuthenticated$.subscribe(access => {
      this.accessAllowedToInfos = access;
    });
  }

  ngOnInit() {
    this.accessAllowedToInfos = this.authService.isAuthenticated();
  }

  userLoggedIn() {
  }

  userLoggedOut() {
    this.router.navigate(['booking']);
  }
}
