import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatListModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture < FooterComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          MatToolbarModule
        ],
        declarations: [FooterComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
