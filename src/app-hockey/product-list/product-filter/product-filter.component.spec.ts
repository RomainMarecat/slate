import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { ProductFilterComponent } from './product-filter.component';
import { SharedModule } from '../../../shared/shared.module';
import { SidenavService } from '../../../shared/sidenav/sidenav.service';

describe('ProductFilterComponent', () => {
  let component: ProductFilterComponent;
  let fixture: ComponentFixture < ProductFilterComponent > ;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
          }),
          SharedModule
        ],
        declarations: [
          ProductFilterComponent
        ],
        providers: [
          SidenavService
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
