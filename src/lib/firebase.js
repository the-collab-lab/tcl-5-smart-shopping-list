// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initalize Firebase.
// var firebaseConfig = {
//   apiKey: "AIzaSyBxHLGe34d6GGIPm7b3reXlMY1rzjixbJs",
//   authDomain: "tcl-5-smart-shopping-list.firebaseapp.com",
//   databaseURL: "https://tcl-5-smart-shopping-list.firebaseio.com",
//   projectId: "tcl-5-smart-shopping-list",
//   storageBucket: "tcl-5-smart-shopping-list.appspot.com",
//   messagingSenderId: "420324673505",
//   appId: "1:420324673505:web:048c207208a494435074a0"
// };

// backup database keys
var firebaseConfig = {
    apiKey: "AIzaSyCu5zXbA9-GmthET-5vHMJRG7Tnyfxrcig",
    authDomain: "tcl-5-backup.firebaseapp.com",
    databaseURL: "https://tcl-5-backup.firebaseio.com",
    projectId: "tcl-5-backup",
    storageBucket: "tcl-5-backup.appspot.com",
    messagingSenderId: "440356142109",
    appId: "1:440356142109:web:dc6e8fa02fef25395a5af4"
};

let fb = firebase.initializeApp(firebaseConfig);

export default fb;
