import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Angulartics2Module } from 'angulartics2';
import { LoaderComponent } from './loader.component';
import { LoaderService } from './loader.service';
import { MockLoaderService } from './mock-loader.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatProgressBarModule,
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
      ],
      declarations: [LoaderComponent],
      providers: [
        {provide: LoaderService, useClass: MockLoaderService},

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
