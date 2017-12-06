export class Environment {
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
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  cloundinaryUrl: string;
  cloudName: string;
  uploadPreset: string;
  clientAdSense: string;
  slotAdSense: number;
  slackToken: string;
  facebook_app_id: string;
}
