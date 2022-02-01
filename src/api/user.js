import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

export const createUser = (email, password) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in: ", user);
      // ...
    })
    .catch((error) => {
      console.error(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
    });
};

export const signInUser = () => {};

export const signOutUser = () => {};

export const checkUserAuth = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('signed in')
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};
