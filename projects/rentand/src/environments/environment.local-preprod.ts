// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  middleware: 'http://batman.rentand.com:443',
  cloudinaryApiKey: '461412661483184',
  cloudinaryApiSecret: 'phaIbT5NtQdISKwPbWdPm2q6o00',
  cloudName: 'rentand',
  uploadPreset: 'gpshn6gv',
  googlePlaceApiKey: 'AIzaSyA6W60RJIPG4s9jVW_jeGiewnSPcJKlj5Y',
  auth0_config: {
      clientID: 'N4eae8v70lNCwf90P1tWvrMIRjxWcfFp',
      domain: 'zeetest.eu.auth0.com'
  },
  stripe: {
    key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
    image: 'assets/images/logo_alone.png',
    fees: 2
  }
};
