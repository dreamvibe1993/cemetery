import axios from "axios";
import store from "../redux/store";
import { setGraves } from "../redux/graves/gravesReducer";
import {
  convertToBackModel,
  convertToFrontModel,
  updateGiftsOnGrave,
} from "../services/converting";

const LOCALHOST = "http://localhost:8888";
const GRAVES_API_URL = "/api/v1/graves";
const PHOTOS_API_URL = "/api/v1/photos";

export const loadGraves = async () => {
  try {
    const response = await axios.get(LOCALHOST + GRAVES_API_URL);
    const gravesConverted = response.data.graves
      ?.filter((item) => item !== undefined)
      .map((grave) => convertToFrontModel(grave));
    store.dispatch(setGraves(gravesConverted));
    console.log(gravesConverted);
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};

/*
const getPhotosURLs = async (photos) => {
  try {
    const formData = new FormData();
    photos.forEach((file) => {
      formData.append("multi-files", file.file, file.file.name);
    });
    const response = await axios.post(LOCALHOST + PHOTOS_API_URL, formData);
    return response.data;
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};
*/

export const postNewGrave = async (data) => {
  // const photosURLs = await getPhotosURLs(data.photos);
  console.log(data);
  try {
    data.photos = [];
    const readyToPost = convertToBackModel({ data });
    const response = await axios.post(LOCALHOST + GRAVES_API_URL, readyToPost);
    return response;
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};

export const deleteGrave = async (grave) => {
  const t = store.getState();
  if (!t?.user?.isAdmin) return;
  return axios.delete(LOCALHOST + GRAVES_API_URL + "/" + grave._id);
};

export const updateGrave = (data, grave) => {
  try {
    return axios.patch(
      LOCALHOST + GRAVES_API_URL + "/" + grave._id,
      updateGiftsOnGrave(data, grave)
    );
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};
