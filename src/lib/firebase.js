// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
var firebaseConfig = {
  apiKey: "AIzaSyBxHLGe34d6GGIPm7b3reXlMY1rzjixbJs",
  authDomain: "tcl-5-smart-shopping-list.firebaseapp.com",
  databaseURL: "https://tcl-5-smart-shopping-list.firebaseio.com",
  projectId: "tcl-5-smart-shopping-list",
  storageBucket: "tcl-5-smart-shopping-list.appspot.com",
  messagingSenderId: "420324673505",
  appId: "1:420324673505:web:048c207208a494435074a0"
};

let fb = firebase.initializeApp(firebaseConfig);

export default fb;
