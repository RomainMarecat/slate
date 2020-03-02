import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListComponent } from './order-list.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OrderItemComponent } from '../order-item/order-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OrderListComponent,
        OrderItemComponent
      ],
      imports: [
        FlexLayoutModule,
        NgPipesModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
