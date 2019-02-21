// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site_name: 'store',
  app_name: 'store',
  firebase: {
    apiKey: 'AIzaSyDFMGdlDQ8jndrs3uz5lYCeI7Q3M63CU9I',
    authDomain: 'store-384269.firebaseapp.com',
    databaseURL: 'https://store-384269.firebaseio.com',
    projectId: 'store-384269',
    storageBucket: 'store-384269.appspot.com',
    messagingSenderId: '37030328986'
  },
  cookie: {
    domain: 'localhost'
  },
  cloudinary: {
    api_key: '635275737532688',
    api_secret: 'OHdYSMfie1xND2yQtioOYEAfjuA',
    cloundinary_url: 'https://res.cloudinary.com/store/image/upload',
    cloud_name: 'store',
    upload_preset: 'k0bxujke',
  },
  clientAdSense: 'ca-pub-4195199088767183',
  slotAdSense: 123456,
  slackToken: 'https://hooks.slack.com/services/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',
  facebook_app_id: '813234845524646'
};
