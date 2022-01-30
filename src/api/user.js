import { database, storage } from "../App";
import { ref, onValue } from "firebase/database";
import store from "../redux/store";
import { setUsers } from "../redux/user/userReducer";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import { userToModel } from "../lib/common-functions/common-functions";

// const analytics = getAnalytics(app);

export const loadUsers = () => {
  const starCountRef = ref(database, "users");
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    /*
    const arr = await Promise.all(
      data.map(async (user) => {
        user.photos = await Promise.all(
          user.photos.map(async (photo) => await asyncThing(photo, storage))
        );
        return user;
      })
    );*/
    store.dispatch(setUsers(data.map((user) => userToModel(user))));
  });
};

// eslint-disable-next-line no-unused-vars
const getFirebaseDownloadURL = (photo, storage) => {
  return new Promise((resolve, reject) => {
    const ref = storageRef(storage, photo);
    getDownloadURL(ref).then((link) => {
      resolve(link);
    });
  });
};

export const getPhotosUrls = async (file) => {
  return new Promise((resolve, reject) => {
    const storageRefLoc = storageRef(storage, file.file.name);
    const uploadTask = uploadBytesResumable(storageRefLoc, file.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        // eslint-disable-next-line default-case
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error(error);
        console.trace(error);
        reject(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
