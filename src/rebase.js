import Rebase from 're-base';
import firebase from 'firebase/app';

import 'firebase/firestore';

var app = firebase.initializeApp({
  apiKey: 'AIzaSyBs-WZEVKr95IdtDtJT0nirWo_p5K9UsC0',
  authDomain: 'rdr-playground.firebaseapp.com',
  databaseURL: 'https://rdr-playground.firebaseio.com',
  projectId: 'rdr-playground',
  storageBucket: 'rdr-playground.appspot.com',
  messagingSenderId: '772725667543',
  appId: '1:772725667543:web:4f17f1374ba7dab6faa292'
});

export const db = firebase.firestore(app);
var base = Rebase.createClass(db);

export default base;


// import * as firebase from 'firebase/app';

// // import 'firebase/analytics';
// import 'firebase/auth';
// import 'firebase/firestore';
// import 'firebase/storage';
// import 'firebase/performance';

// import Rebase from 're-base';

// firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// });

// export default firebase;
// // export const analytics = firebase.analytics();
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
// export const performance = firebase.performance();

// export var base = Rebase.createClass(firestore);