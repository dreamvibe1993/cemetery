import { database, storage } from "../App";
import { ref, onValue, set } from "firebase/database";
import store from "../redux/store";
import { setUsers } from "../redux/user/userReducer";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  convertToBackModel,
  convertToFrontModel,
} from "../lib/common-functions/common-functions";

export const loadUsers = () => {
  const starCountRef = ref(database, "users");
  onValue(starCountRef, async (snapshot) => {
    const data = await snapshot.val();
    store.dispatch(setUsers(data.map((user) => convertToFrontModel(user))));
  });
};

export const addNewBurial = async (data) => {
  const photoLinks = await Promise.all(
    data.pics.map(async (ph) => {
      return getPhotosUrls(ph);
    })
  );
  return new Promise((res, rej) => {
    try {
      const readyToPost = convertToBackModel({ data, photoLinks });
      const t = store.getState();
      set(ref(database, "users/" + t.user.users.length), readyToPost)
        .then((v) => {
          res(v);
        })
        .catch((e) => {
          rej(e);
        });
    } catch (e) {
      console.error(e);
      console.trace(e);
      rej(e);
    }
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

/*
    const arr = await Promise.all(
      data.map(async (user) => {
        user.photos = await Promise.all(
          user.photos.map(async (photo) => await asyncThing(photo, storage))
        );
        return user;
      })
    );*/
