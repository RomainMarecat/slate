export interface CloudinaryConfiguration {
  cloud_name: string;
  upload_preset: string;
  api_key: string;
  api_secret: string;
  callback?: string;
}

export class CloudinaryConfig implements CloudinaryConfiguration {
  cloud_name: string;
  upload_preset: string;
  api_key: string;
  api_secret: string;
  callback?: string;

  constructor(apiKey: string, apiSecret: string, uploadPreset: string, cloudName: string) {
    this.api_key = apiKey;
    this.api_secret = apiSecret;
    this.upload_preset = uploadPreset;
    this.cloud_name = cloudName;
  }
};
