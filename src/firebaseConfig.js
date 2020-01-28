import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC3VheofZKdYSuU4uZRHg_uuqcHRRu8a0U',
    authDomain: 'memtasty.firebaseapp.com',
    databaseURL: 'https://memtasty.firebaseio.com',
    projectId: 'memtasty',
    storageBucket: 'memtasty.appspot.com',
    messagingSenderId: '647683787092',
    appId: '1:647683787092:web:39abb25bc1e57ab622e0c1',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();
const firestore = firebase.firestore();

export { storage, auth, firestore, firebase as default };
