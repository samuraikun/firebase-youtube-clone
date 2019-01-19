import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC06ZhCbzvOLVDaURdvs-E6ZeLLnVryVS0",
  authDomain: "fir-clone-1a266.firebaseapp.com",
  databaseURL: "https://fir-clone-1a266.firebaseio.com",
  projectId: "fir-clone-1a266",
  storageBucket: "fir-clone-1a266.appspot.com",
  messagingSenderId: "393502572886"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings({
  timestampsInSnapshots: true
});

export default firebase;
