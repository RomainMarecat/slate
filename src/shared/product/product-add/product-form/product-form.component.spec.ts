import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Angulartics2Module } from 'angulartics2';
import { ProductFormComponent } from './product-form.component';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Cloudinary } from 'cloudinary-core';
import { CloudinaryModule } from '../../../media/cloudinary/cloudinary.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageCropperModule } from 'ngx-img-cropper';
import { MockAlertService } from '../../../popup/mock-alert.service';
import { AlertService } from '../../../popup/alert.service';
import { MockUserService } from '../../../user/shared/mock-user.service';
import { UserService } from '../../../user/shared/user.service';
import { ObjectService } from '../../../util/object.service';
import { MediaService } from '../../../media/media.service';
import { MockMediaService } from '../../../media/mock-media.service';
import { DeviceService } from '../../../device/device.service';
import { MediaModule } from '../../../media/media.module';
import { environment } from '../../../../app-store/environments/environment';
import { configureTestSuite } from '../../../unit-test/configure-test-suite';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  configureTestSuite();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        FileUploadModule,
        ImageCropperModule,
        MatCardModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatStepperModule,
        MatExpansionModule,
        MatCheckboxModule,
        MediaModule,
        CloudinaryModule.forRoot({Cloudinary}, environment.cloudinary),
        Angulartics2Module.forRoot({
          developerMode: true,
          pageTracking: {
            clearIds: true,
          },
        }),
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: TranslateFakeLoader}
        })
      ],
      declarations: [
        ProductFormComponent,
      ],
      providers: [
        {provide: AlertService, useClass: MockAlertService},
        {provide: UserService, useClass: MockUserService},
        {provide: MediaService, useClass: MockMediaService},
        ObjectService,
        DeviceService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
