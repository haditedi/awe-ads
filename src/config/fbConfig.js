import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBst7U2o0LLuTHgOqaOqGtB-RJPrVyQJXs",
  authDomain: "awe-ads.firebaseapp.com",
  databaseURL: "https://awe-ads.firebaseio.com",
  projectId: "awe-ads",
  storageBucket: "awe-ads.appspot.com",
  messagingSenderId: "122257118754",
  appId: "1:122257118754:web:aeed25507f387e50485c7b",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export default firebase;
