import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Mono } from '../../../shared/interfaces/mono';

@Component({
  selector: 'app-profil-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent implements OnInit {
  @Input() monos: Array<Mono>;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  showProfil(mono: Mono) {
    this.router.navigate([
      '/profils',
      `${mono.user_metadata.slug}`
    ]);
  }

}
