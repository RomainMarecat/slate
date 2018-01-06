import CloudinaryConfiguration from './cloudinary-configuration.class';
import { Injectable } from '@angular/core';

@Injectable()
export class CloudinaryConfig implements CloudinaryConfiguration {
  cloud_name: string;
  upload_preset ?: string;
  api_key ?: string;
  api_secret ?: string;

  constructor(cloudinary: CloudinaryConfiguration) {
    this.api_key = cloudinary.api_key;
    this.api_secret = cloudinary.api_secret;
    this.upload_preset = cloudinary.upload_preset;
    this.cloud_name = cloudinary.cloud_name;
  }
}
