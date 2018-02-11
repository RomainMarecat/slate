import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../../../shared/product/product.service';
import { MockProductService } from '../../../../shared/product/mock-product.service';

import { SortContainerComponent } from './sort-container.component';
import { SortItemComponent } from './../sort-item/sort-item.component';

describe('SortContainerComponent', () => {
  let component: SortContainerComponent;
  let fixture: ComponentFixture < SortContainerComponent > ;

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
          { provide: ProductService, useClass: MockProductService },
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
