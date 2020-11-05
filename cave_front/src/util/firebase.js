import firebase from 'firebase/app'
import 'firebase/database';    // for realtime database
const firebaseConfig = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyBs6b_0vVMsjFVqbMXvAJtb9sMHa3mF4AQ",
    authDomain: "juha-base.firebaseapp.com",
    databaseURL: "https://juha-base.firebaseio.com",
    projectId: "juha-base",
    storageBucket: "juha-base.appspot.com",
    messagingSenderId: "235145463834",
    appId: "1:235145463834:web:ce589753121a34515629a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;