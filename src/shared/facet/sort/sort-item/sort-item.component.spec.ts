import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductService } from '../../../../shared/product/product.service';
import { MockProductService } from '../../../../shared/product/mock-product.service';

import { SortItemComponent } from './sort-item.component';
import { configureTestSuite } from 'shared/unit-test/configure-test-suite';

describe('SortItemComponent', () => {
  let component: SortItemComponent;
  let fixture: ComponentFixture<SortItemComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
      ],
      declarations: [SortItemComponent],
      providers: [
        {provide: ProductService, useClass: MockProductService},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
