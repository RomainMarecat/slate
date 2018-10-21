import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialComponent } from './material.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MaterialComponent', () => {
  let component: MaterialComponent;
  let fixture: ComponentFixture<MaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [MaterialComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
