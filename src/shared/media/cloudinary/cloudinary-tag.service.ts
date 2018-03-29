import { Injectable, Inject } from '@angular/core';
import { Cloudinary } from '../cloudinary/cloudinary.service';

@Injectable()
export class CloudinaryTagService {

  constructor(private cloudinary: Cloudinary) {
  }

  /**
     * Get tags from public id of cloudinary
     * @return {any}
     */
  getPictureTags(publicId) {
    const imageTag = this.cloudinary.imageTag(publicId);
    return this.getElementAttributes(imageTag.attributes());
  }

  getPictureSrc(publicId): string {
    const tags = this.getPictureTags(publicId);
    return tags.src as string;
  }

  getElementAttributes(attributesLiteral: string[]) {
    const attr = { src: '' };

    Object.keys(attributesLiteral).forEach(attrName => {
      attr[attrName] = attributesLiteral[attrName];
    });

    return attr;
  }
}
