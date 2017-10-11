import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
  selector: 'clothing-image',
  templateUrl: './clothing-image.component.html',
  styleUrls: ['./clothing-image.component.scss']
})
export class ClothingImageComponent implements OnInit {

  data: any;
  croppedWidth: number;
  croppedHeight: number;
  cropperSettings: CropperSettings;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {

    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 200;
    this.cropperSettings.height = 200;

    this.cropperSettings.croppedWidth = 200;
    this.cropperSettings.croppedHeight = 200;

    this.cropperSettings.canvasWidth = 500;
    this.cropperSettings.canvasHeight = 300;

    this.cropperSettings.minWidth = 10;
    this.cropperSettings.minHeight = 10;

    this.cropperSettings.rounded = false;
    this.cropperSettings.keepAspect = false;

    this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings.cropperDrawSettings.strokeWidth = 2;

    this.data = {};

  }

  ngOnInit() {}

  fileChangeListener($event) {
    var image: any = new Image();
    var file: File = $event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function(loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);

    };

    myReader.readAsDataURL(file);
  }

}
