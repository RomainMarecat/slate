import { environment } from './../../../environments/environment';

interface CloudinaryConfiguration {
  cloud_name: string;
  upload_preset: string;
  api_key: string;
  api_secret: string;
  callback?: string;
}

export const CloudinaryConfig: CloudinaryConfiguration = {
  cloud_name: environment.cloudName,
  upload_preset: environment.uploadPreset,
  api_key: environment.cloudinaryApiKey,
  api_secret: environment.cloudinaryApiSecret
};
