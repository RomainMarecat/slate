// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  site_name: 'monpullmoche.com',
  app_name: 'monpullmoche',
  firebase: {
    apiKey: 'AIzaSyB1K9_bZJDLq48C-4xAUhNEjP79Q-60YKw',
    authDomain: 'mon-pull-moche.firebaseapp.com',
    databaseURL: 'https://mon-pull-moche.firebaseio.com',
    projectId: 'mon-pull-moche',
    storageBucket: 'mon-pull-moche.appspot.com',
    messagingSenderId: '1050522744023'
  },
  cloudinaryApiKey: '635275737532688',
  cloudinaryApiSecret: 'OHdYSMfie1xND2yQtioOYEAfjuA',
  cloundinaryUrl: 'https://res.cloudinary.com/monpullmoche/image/upload',
  cloudName: 'monpullmoche',
  uploadPreset: 'k0bxujke',
  clientAdSense: 'ca-pub-4195199088767183',
  slotAdSense: 123456,
  slackToken: 'https://hooks.slack.com/services/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',
  facebook_app_id: '813234845524646'
};
