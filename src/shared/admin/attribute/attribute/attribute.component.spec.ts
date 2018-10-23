import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeComponent } from './attribute.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MenuService } from '../../../menu/menu.service';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';

describe('AttributeComponent', () => {
  let component: AttributeComponent;
  let fixture: ComponentFixture<AttributeComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [AttributeComponent],
      providers: [
        MenuService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
