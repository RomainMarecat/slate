import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageImageComponent } from './storage-image.component';

describe('StorageImageComponent', () => {
  let component: StorageImageComponent;
  let fixture: ComponentFixture<StorageImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
