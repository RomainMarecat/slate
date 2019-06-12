import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCheckboxModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatLineModule,
  MatMenuModule,
  MatCommonModule,
  MatTooltipModule,
  MatExpansionModule,
  MatStepperModule
} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { SharedModule } from '../../shared.module';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryService } from '../../category/category.service';
import { CategoryAddComponent } from './category-add/category-add.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFirestore } from '@angular/fire/firestore';
import { CategoryComponent } from './category/category.component';

export const TABLE_CATEGORY = new InjectionToken<string>('category');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatLineModule,
    MatExpansionModule,
    MatMenuModule,
    MatCommonModule,
    MatTooltipModule,
    MatStepperModule,

    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    TranslateModule,
    CategoryRoutingModule
  ],
  declarations: [
    CategoryListComponent,
    CategoryAddComponent,
    CategoryComponent
  ],
  providers: [
    {provide: TABLE_CATEGORY, useValue: 'category'},
    {
      provide: CategoryService,
      useClass: CategoryService,
      deps: [AngularFirestore, TABLE_CATEGORY]
    },
  ]
})
export class CategoryModule {
}
