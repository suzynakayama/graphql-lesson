import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDidPGqHTwWUtGN0IgDFPa-S1wFhfCu_6E",
  authDomain: "online-shop-e04ec.firebaseapp.com",
  databaseURL: "https://online-shop-e04ec.firebaseio.com",
  projectId: "online-shop-e04ec",
  storageBucket: "online-shop-e04ec.appspot.com",
  messagingSenderId: "496392365877",
  appId: "1:496392365877:web:05ae2819e87100b3dbce7c",
  measurementId: "G-H3QPR2RLE9",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
