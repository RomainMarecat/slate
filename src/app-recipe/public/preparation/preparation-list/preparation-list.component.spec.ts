import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationListComponent } from './preparation-list.component';

describe('PreparationListComponent', () => {
  let component: PreparationListComponent;
  let fixture: ComponentFixture<PreparationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
