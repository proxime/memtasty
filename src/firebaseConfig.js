import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
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
const database = firebase.database();

export { storage, auth, database, firebase as default };
