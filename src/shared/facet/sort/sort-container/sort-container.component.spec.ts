import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../../product/shared/product.service';
import { MockProductService } from '../../../product/shared/mock-product.service';

import { SortContainerComponent } from './sort-container.component';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SortItemComponent } from '../sort-item/sort-item.component';

describe('SortContainerComponent', () => {
  let component: SortContainerComponent;
  let fixture: ComponentFixture<SortContainerComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [SortContainerComponent, SortItemComponent],
      providers: [
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
