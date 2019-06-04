import { Component, OnInit, ViewChild, Input, Output, EventEmitter, NgZone, Optional } from '@angular/core';
import { ImageCropperComponent, CropperSettings } from 'ngx-img-cropper';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Media } from '../../media';
import { SHA1 } from 'crypto-js';
import { ObjectService } from '../../../util/object.service';
import { MediaService } from '../../media.service';
import { DeviceService } from '../../../device/device.service';
import { HttpClient } from '@angular/common/http';
import { DocumentReference } from '@firebase/firestore-types';
import { Cloudinary } from '../cloudinary.service';

@Component({
  selector: 'app-image-product',
  templateUrl: './image-product.component.html',
  styleUrls: ['./image-product.component.scss']
})
export class ImageProductComponent implements OnInit {
  @Output() imageChanged: EventEmitter<Media> = new EventEmitter<Media>();
  @Output() uploaderStatus: EventEmitter<string> = new EventEmitter<string>();
  @Output() progressStatus: EventEmitter<number> = new EventEmitter<number>();
  data: any;
  progressData: number;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;
  uploader: FileUploader;
  publicId: string;
  url: string;
  extension: string;
  @Input() media: Media;
  @Input() displayValidation: boolean;
  uploaderMessage: string;
  cropperClass: string;
  isUploaded: boolean;
  cloudinaryActive = false;

  constructor(@Optional() private cloudinary: Cloudinary,
              private zone: NgZone,
              private http: HttpClient,
              public objectService: ObjectService,
              private mediaService: MediaService,
              private deviceService: DeviceService) {
    this.cloudinaryActive = !!cloudinary;
    if (!this.media) {
      this.media = new Media();
    }
    this.displayValidation = false;
    this.progressData = 0;
    this.cropperClass = 'hidden';
    this.cropperSettings = new CropperSettings();

    this.cropperSettings.noFileInput = true;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.dragIconStrokeColor = '#223a00';
    this.cropperSettings.cropperDrawSettings.strokeColor = '#223a00';

    this.data = {};
    this.isUploaded = false;
  }

  /**
   * Init all cloudinary module
   * All state of upload Item
   */
  ngOnInit() {
    if (this.cloudinary) {
      this.uploader = this.getUploaderConfig();
      this.initCanvas();
      this.handleOnAfterAddingFile();
      this.handleOnBuildItemForm();
      this.handleOnCancelItem();
      this.handleOnBeforeUploadItem();
      this.handleOnProgressItem();
      this.handleOnSuccessItem();
      this.handleOnErrorItem();
    }
  }

  handleOnErrorItem() {
    this.uploader.onErrorItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.error(response);
      return {item, response, status, headers};
    };
  }

  handleOnSuccessItem() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      // response is the cloudinary response
      // see http://cloudinary.com/documentation/upload_images#upload_response
      const res: any = JSON.parse(response);
      this.publicId = res.public_id;
      this.url = res.secure_url;
      this.extension = res.format;

      const image: HTMLImageElement = new Image();
      image.src = this.url;
      image.setAttribute('crossOrigin', '');
      image.addEventListener('load', (data) => {
        this.cropper.setImage(image);
        this.cropperClass = '';
      });

      this.isUploaded = true;

      return {item, response, status, headers};
    };
  }

  handleOnProgressItem() {
    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.progressData = progress as number;

      return {fileItem, progress};
    };
  }

  handleOnBeforeUploadItem() {
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.progressData = 0;

      return {fileItem};
    };
  }

  handleOnCancelItem() {
    this.uploader.onCancelItem = (item: any, response: string, status: number, headers: any) => {
      this.uploaderMessage = 'You cancel picture upload';
      this.onCancelUpload();

      return {item, response, status, headers};
    };
  }

  handleOnBuildItemForm() {
    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const transform = 't_media_web_import';
      const paramsStr = 'timestamp=' + timestamp +
        '&transformation=' +
        't_media_web_import' +
        '&upload_preset=' + this.cloudinary.config().upload_preset +
        this.cloudinary.config().api_secret;
      const signature = SHA1(paramsStr);

      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('file', fileItem);
      form.append('timestamp', timestamp.toString());
      form.append('signature', signature.toString());
      form.append('api_key', this.cloudinary.config().api_key);
      form.append('transformation', transform);

      fileItem.withCredentials = false;
      return {fileItem, form};
    };
  }

  handleOnAfterAddingFile() {
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      return fileItem;
    };

  }

  getUploaderConfig(): FileUploader {
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`,
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [{
        name: 'X-Requested-With',
        value: 'XMLHttpRequest'
      }]
    };
    return new FileUploader(uploaderOptions);
  }

  initCanvas() {
    this.cropperSettings.width = 240;
    this.cropperSettings.height = 240;

    this.cropperSettings.croppedWidth = 240;
    this.cropperSettings.croppedHeight = 240;

    this.cropperSettings.canvasWidth = 250;
    this.cropperSettings.canvasHeight = 400;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.addSmallDevice();

    this.addMediumDevice();
  }

  addSmallDevice() {
    if (this.deviceService.isSmallAndUp()) {
      this.cropperSettings.width = 240;
      this.cropperSettings.height = 240;

      this.cropperSettings.croppedWidth = 240;
      this.cropperSettings.croppedHeight = 240;

      this.cropperSettings.canvasWidth = 350;
      this.cropperSettings.canvasHeight = 500;

      this.cropperSettings.minWidth = 10;
      this.cropperSettings.minHeight = 10;
    }
  }

  addMediumDevice() {
    if (this.deviceService.isMediumAndUp()) {
      this.cropperSettings.width = 240;
      this.cropperSettings.height = 240;

      this.cropperSettings.croppedWidth = 240;
      this.cropperSettings.croppedHeight = 240;

      this.cropperSettings.canvasWidth = 500;
      this.cropperSettings.canvasHeight = 300;

      this.cropperSettings.minWidth = 10;
      this.cropperSettings.minHeight = 10;
    }
  }

  /**
   * Can upload all image
   */
  uploadAll() {
    this.uploader.uploadAll();
  }

  /**
   * Validate a new Image and Cropped size
   */
  validateImage() {
    const width = this.cropper.cropper.getCropBounds().width;
    const height = this.cropper.cropper.getCropBounds().height;
    const x = this.cropper.cropper.getCropBounds().left;
    const y = this.cropper.cropper.getCropBounds().top;
    this.media.cropper = {
      width: width,
      height: height,
      x: x,
      y: y
    };
    this.media.public_id = this.publicId;
    this.media.url = this.url;
    this.media.alt = this.url;
    this.media.extension = this.extension;
    this.media.public = true;

    this.onMediaChange(this.media);
  }

  /**
   * Cancel current upload
   */
  onCancelUpload() {
    this.uploaderStatus.emit(this.uploaderMessage);
  }

  clearUpload() {
    this.data = {};
  }

  /**
   * Propagate new media to parent
   */
  onMediaChange(media: Media) {
    this.mediaService.createMedia(media).then((doc: DocumentReference) => {
      media.key = doc.id;
      this.imageChanged.emit(media);
    }, (err) => {
      console.error('onMediaChange:addMedia:err', err);
    });
  }
}
