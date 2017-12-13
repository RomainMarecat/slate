export interface Environment {
  production: boolean;
  site_name: string;
  app_name: string;
  firebase: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
  };
  cloudinary: {
    api_key: string;
    api_secret: string;
    cloudinary_url ?: string;
    cloud_name: string;
    upload_preset: string;
  };
  clientAdSense: string;
  slotAdSense: number;
  slackToken: string;
  facebook_app_id: string;
}
