import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../product/shared/product.service';
import { MockProductService } from '../../product/shared/mock-product.service';

import { SortComponent } from './sort.component';
import { SortItemComponent } from './sort-item/sort-item.component';
import { SortContainerComponent } from './sort-container/sort-container.component';
import { configureTestSuite } from '../../unit-test/configure-test-suite';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [SortComponent, SortContainerComponent, SortItemComponent],
      providers: [
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
