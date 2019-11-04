import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cloudinary } from './cloudinary.service';
import { SHA1 } from 'crypto-js';
import { DocumentReference } from '@firebase/firestore-types';
import { MediaService } from '../media.service';
import { Media } from '../media';
import { ProductService } from '../../product/shared/product.service';
import { Product } from '../../product/shared/product';

@Injectable()
export class CloudinaryUploadService {

  constructor(private http: HttpClient,
              private cloudinary: Cloudinary,
              private productService: ProductService,
              private mediaService: MediaService) {}

  uploadImage(product: Product, url: string): void {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/image/upload`;
    const body = this.getSignature(url);

    this.http.post(
      cloudinaryUrl,
      this.getSignature(url)
    ).subscribe(response =>
      this.createMedia(url, response, product)
      .then((doc: DocumentReference) => {
        const index = product.images.indexOf(url);
        product.images.splice(index, 1);
        product.images.push(doc.id);
        this.productService.updateProduct(product);
      }, (err) => {
        console.error('onMediaChange:addMedia:err', err);
      })
    );
  }

  createMedia(url: string, response: any, product: Product): Promise < any > {
    const media: Media = {
      public_id: response.public_id,
      url: response.secure_url,
      alt: product.name,
      extension: response.format,
      public: true,
      cropper: {
        width: response.width,
        height: response.height,
        x: response.width,
        y: response.height
      }
    };

    return this.onMediaChange(media);
  }

  /**
   * Propagate new media to parent
   */
  onMediaChange(media: Media): Promise < any > {
    return this.mediaService.createMedia(media);
  }

  getSignature(url: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const transform = 't_media_web_import';
    const paramsStr = 'timestamp=' + timestamp +
      '&transformation=' +
      't_media_web_import' +
      '&upload_preset=' + this.cloudinary.config().upload_preset +
      this.cloudinary.config().api_secret;
    const signature = SHA1(paramsStr);

    const body = {
      upload_preset: this.cloudinary.config().upload_preset,
      file: url,
      timestamp: timestamp.toString(),
      signature: signature.toString(),
      api_key: this.cloudinary.config().api_key,
      transformation: transform
    };

    return body;
  }

}
