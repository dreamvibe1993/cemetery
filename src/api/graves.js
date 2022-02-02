import { database, storage } from "../App";
import { ref, onValue, set, get, remove } from "firebase/database";
import store from "../redux/store";
import { setGraves } from "../redux/graves/gravesReducer";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import {
  convertToBackModel,
  convertToFrontModel,
  updateGiftsOnGrave,
} from "../lib/common-functions/common-functions";

const graves = "graves";
const users = "users";

export const loadGraves = () => {
  const starCountRef = ref(database, graves);
  return new Promise((res, rej) => {
    const unsub = onValue(starCountRef, async (snapshot) => {
      const data = await snapshot.val();
      console.log(data)
      if (data) {
        const gravesConverted = data
          ?.filter((item) => item !== undefined)
          .map((grave) => convertToFrontModel(grave));
        store.dispatch(setGraves(gravesConverted));
        res(unsub);
      } else {
        rej(unsub);
      }
    });
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
      set(
        ref(database, graves + "/" + t?.graves?.graves?.length || "0"),
        readyToPost
      )
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

export const deleteGrave = async (grave) => {
  const t = store.getState();
  if (!t?.user?.isAdmin) return;
  const dbRef = ref(database, graves);
  return new Promise((res, rej) => {
    try {
      get(dbRef).then((s) => {
        const db = s.val();
        const indexToDel = db.findIndex((gr) => gr?.id === grave.id);
        console.log(db, indexToDel, graves + "/" + indexToDel)
        remove(graves + "/" + indexToDel).then(() => {
          console.log("grave " + indexToDel + " is deleted");
          res();
        });
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

export const updateGrave = (data, grave) => {
  const dbRef = ref(database, graves);
  return new Promise((res, rej) => {
    get(dbRef).then((s) => {
      const db = s.val();
      const indexToUpd = db.findIndex((gr) => gr?.id === grave.id);
      set(
        ref(database, graves + "/" + indexToUpd),
        updateGiftsOnGrave(data, grave)
      )
        .then((v) => {
          res(v);
        })
        .catch((e) => {
          rej(e);
        });
    });
  });
};
