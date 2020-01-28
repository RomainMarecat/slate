import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollToTopButtonComponent } from './scroll-to-top-button.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScrollToTopButtonComponent', () => {
  let component: ScrollToTopButtonComponent;
  let fixture: ComponentFixture<ScrollToTopButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollToTopButtonComponent],
      imports: [
        MatIconModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToTopButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
