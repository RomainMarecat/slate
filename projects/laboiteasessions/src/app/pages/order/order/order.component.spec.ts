import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { OrderItemComponent } from '../order-item/order-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderComponent,
        OrderListComponent,
        OrderItemComponent,
      ],
      imports: [
        FlexLayoutModule,
        NgPipesModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        }),
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
