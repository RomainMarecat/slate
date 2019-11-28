// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  site_name: 'scanobeer',
  app_name: 'scanobeer',
  firebase: {
    apiKey: 'AIzaSyBPunkmCJ5gC7lloNLP68yxkVhxdv0FfxM',
    authDomain: 'scanobeer-384269.firebaseapp.com',
    databaseURL: 'https://scanobeer-384269.firebaseio.com',
    projectId: 'scanobeer-384269',
    storageBucket: 'scanobeer-384269.appspot.com',
    messagingSenderId: '307402664363',
    appId: '1:307402664363:web:682d16dd618c2854710aee',
    measurementId: 'G-CZ62T41WB1'
  },
  cookie: {
    domain: 'localhost'
  },
  clientAdSense: 'ca-pub-4195199088767183',
  slotAdSense: 123456,
  slackToken: 'https://hooks.slack.com/services/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',
  facebook_app_id: '813234845524646',
  stripeKey: 'pk_test_ZMBhVWlsAzGDErk8PFH28TWX'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
