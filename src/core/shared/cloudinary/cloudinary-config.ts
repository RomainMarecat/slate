import {cloudinaryApiKey, cloudinaryApiSecret, cloudName, uploadPreset} from './../shared.module';

// interface CloudinaryConfiguration {
//   cloud_name: string;
//   upload_preset: string;
//   api_key: string;
//   api_secret: string;
//   callback?: string;
// }

// : CloudinaryConfiguration

export const CloudinaryConfig = {
  cloud_name: cloudName,
  upload_preset: uploadPreset,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret
};
