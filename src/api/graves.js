import axios from "axios";
import { database } from "../App";
import { ref, set, get } from "firebase/database";
import store from "../redux/store";
import { setGraves } from "../redux/graves/gravesReducer";
import { getDownloadURL, ref as storageRef } from "firebase/storage";
import {
  convertToBackModel,
  convertToFrontModel,
  updateGiftsOnGrave,
} from "../services/converting";

const graves = "graves";

const GRAVES_API_URL = "/api/v1/graves";
const PHOTOS_API_URL = "/api/v1/photos";

export const loadGraves = () => {
  return new Promise(async (res, rej) => {
    try {
      const response = await axios.get(
        "http://localhost:8888" + GRAVES_API_URL
      );
      const gravesConverted = response.data
        ?.filter((item) => item !== undefined)
        .map((grave) => convertToFrontModel(grave));
      store.dispatch(setGraves(gravesConverted));
      res(gravesConverted);
    } catch (e) {
      console.error(e);
      console.trace(e);
      rej(e);
    }
  });
};

const getPhotosURLs = async (photos) => {
  const formData = new FormData();
  photos.forEach((file) => {
    formData.append("multi-files", file.file, file.file.name);
  });
  const response = await axios.post(
    "http://localhost:8888" + PHOTOS_API_URL,
    formData
  );
  return response.data;
};

export const postNewGrave = async (data) => {
  const photosURLs = await getPhotosURLs(data.photos);
  try {
    data.photos = photosURLs;
    const readyToPost = convertToBackModel({ data });
    const response = await axios.post(
      "http://localhost:8888" + GRAVES_API_URL,
      readyToPost
    );
    return response;
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};

export const deleteGrave = async (grave) => {
  const t = store.getState();
  if (!t?.user?.isAdmin) return;
  return new Promise((res, rej) => {
    const dbRef = ref(database, graves);
    try {
      get(dbRef).then((s) => {
        const db = s.val();
        const indexToDel = db.findIndex((gr) => gr?.id === grave.id);
        set(ref(database, graves + "/" + indexToDel), null).then(() => {
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
