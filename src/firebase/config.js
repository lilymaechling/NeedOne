import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBzKxtlezJhjNfjQQtGZVWZA6uBTYmWtOc',
  authDomain: 'needone.firebaseapp.com',
  databaseURL: 'https://needone.firebaseio.com/',
  projectId: 'needone',
  storageBucket: 'needone.appspot.com',
  messagingSenderId: '261581815542',
  appId: '1:261581815542:ios:fbcfe6f1420bcc0be0f6d7',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };