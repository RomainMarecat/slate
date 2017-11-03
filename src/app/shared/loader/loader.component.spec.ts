import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderService } from './loader.service';
import { MockLoaderService } from './mock-loader.service';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture < LoaderComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          MatProgressSpinnerModule
        ],
        declarations: [LoaderComponent],
        providers: [
          { provide: LoaderService, useClass: MockLoaderService },

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
