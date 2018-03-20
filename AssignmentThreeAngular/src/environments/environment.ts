// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: 'AIzaSyDss4eAIC5ZDytEbJ6vZ6vQxLWzG9KZ23Q',
    authDomain: 'customers-82978.firebaseapp.com',
    databaseURL: 'https://customers-82978.firebaseio.com',
    projectId: 'customers-82978',
    storageBucket: '',
    messagingSenderId: '709649028767',
  },
};
