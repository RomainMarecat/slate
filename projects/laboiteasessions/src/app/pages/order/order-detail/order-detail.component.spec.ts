import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailComponent } from './order-detail.component';
import { NgPipesModule } from 'ngx-pipes';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailComponent],
      imports: [
        MatCardModule,
        MatIconModule,
        MatListModule,
        HttpClientTestingModule,
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
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
