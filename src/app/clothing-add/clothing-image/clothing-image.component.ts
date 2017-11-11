import { Component, OnInit, ViewChild, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { Cloudinary } from '@cloudinary/angular-4.x';
import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { Media } from './../../shared/media/media';
import { SHA1 } from 'crypto-js';
import { environment } from './../../../environments/environment';
import { ObjectService } from './../..//shared/util/object.service';
import { MediaService } from './../..//shared/media/media.service';

@Component({
  selector: 'app-clothing-image',
  templateUrl: './clothing-image.component.html',
  styleUrls: ['./clothing-image.component.scss']
})
export class ClothingImageComponent implements OnInit {
  @Output() imageChanged: EventEmitter < Media > = new EventEmitter < Media > ();
  @Output() uploaderStatus: EventEmitter < string > = new EventEmitter < string > ();
  @Output() progressStatus: EventEmitter < number > = new EventEmitter < number > ();
  data: any;
  progressData: number;
  croppedWidth: number;
  croppedHeight: number;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) public cropper: ImageCropperComponent;
  uploader: FileUploader;
  publicId: string;
  url: string;
  extension: string;
  @Input() media: Media;
  uploaderMessage: string;
  hasBaseDropZoneOver: boolean;
  cropperClass: string;

  /**
   *
   * @param {Cloudinary}    private cloudinary
   * @param {NgZone}        private zone
   * @param {Http}          private http
   * @param {ObjectService} public  objectService
   * @param {MediaService}  private mediaService
   */
  constructor(private cloudinary: Cloudinary,
    private zone: NgZone,
    private http: Http,
    public objectService: ObjectService,
    private mediaService: MediaService
  ) {
    this.progressData = 0;
    this.cropperClass = 'hidden';
    this.cropperSettings = new CropperSettings();

    this.cropperSettings.noFileInput = true;

    this.cropperSettings.width = 400;
    this.cropperSettings.height = 400;

    this.cropperSettings.croppedWidth = 240;
    this.cropperSettings.croppedHeight = 240;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.dragIconStrokeColor = '#223a00';
    this.cropperSettings.cropperDrawSettings.strokeColor = '#223a00';

    this.data = {};
  }

  /**
   * Init all cloudinary module
   * All state of upload Item
   */
  ngOnInit() {
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
    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onAfterAddingFile = (fileItem: any) => {
      return fileItem;
    };

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
      form.append('api_key', environment.cloudinaryApiKey);
      form.append('transformation', transform);

      fileItem.withCredentials = false;
      return { fileItem, form };
    };

    this.uploader.onCancelItem = (item: any, response: string, status: number, headers: any) => {
      this.uploaderMessage = 'You cancel picture upload';
      this.onCancelUpload();

      return { item, response, status, headers };
    };

    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.progressData = 0;

      return { fileItem };
    };

    this.uploader.onProgressItem = (fileItem: any, progress: any) => {
      this.progressData = progress as number;

      return { fileItem, progress };
    };

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

      return { item, response, status, headers };
    };

    this.uploader.onErrorItem = (item: any, response: string, status: number, headers: ParsedResponseHeaders) => {
      console.error(response);
      return { item, response, status, headers };
    };
  }

  /**
   * Can upload all image
   */
  uploadAll() {
    this.uploader.uploadAll();
  }

  /**
   * Empty function check if object is empty
   * @todo refacto in object service
   * @param  {}  obj
   * @return {boolean}
   */
  isEmpty(obj): boolean {
    return Object.keys(obj).length === 0;
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

  /**
   * Propagate new media to parent
   * @param {Media} media
   */
  onMediaChange(media: Media) {
    this.mediaService.addMedia(media);
    this.imageChanged.emit(media);
  }
}
