import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  color = 'primary';
  mode = 'indeterminate';
  value = 0;
  show = false;
  private subscription: Subscription;

  /**
   *
   * @param {LoaderService} loaderService
   */
  constructor(private loaderService: LoaderService) {
  }

  /**
   * Subsribe to show loader
   */
  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  /**
   * Destroy component
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
