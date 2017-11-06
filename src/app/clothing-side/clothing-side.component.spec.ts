import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule
} from '@angular/material';
import { ClothingSideComponent } from './clothing-side.component';

describe('ClothingSideComponent', () => {
  let component: ClothingSideComponent;
  let fixture: ComponentFixture < ClothingSideComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          MatCardModule
        ],
        declarations: [ClothingSideComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClothingSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});