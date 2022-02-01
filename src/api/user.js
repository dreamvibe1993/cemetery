import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import store from "../redux/store";
import { setUserAuth, setUser } from "../redux/user/userReducer";

export const createUser = (email, password, username) => {
  const auth = getAuth();
  return new Promise((res, rej) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential;
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        console.log("signed in: ", user);
        res(user);
        // ...
      })
      .catch((error) => {
        console.error(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
        alert(errorCode + "" + errorMessage);
        rej(error);
      });
  });
};

export const logInUser = () => {};

export const logOutUser = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      console.log("user signed out");
      // Sign-out successful.
    })
    .catch((error) => {
      console.error(error);
      console.trace(error);
      // An error happened.
    });
};

export const checkUserAuth = () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      console.log("signed in");
      store.dispatch(setUserAuth(true));
      store.dispatch(
        setUser({
          email: user.email,
          username: user.displayName,
        })
      );
      // ...
    } else {
      // User is signed out
      console.log("signed out");
      store.dispatch(setUserAuth(false));
      // ...
    }
  });
};
