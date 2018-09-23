import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../../shared/product/product.service';
import { MockProductService } from '../../../shared/product/mock-product.service';

import { SortComponent } from './sort.component';
import { SortItemComponent } from './sort-item/sort-item.component';
import { SortContainerComponent } from './sort-container/sort-container.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

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
