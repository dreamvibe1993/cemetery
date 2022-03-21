import axios from "axios";
import store from "../redux/store";
import {
  setGraves,
  setGravesLoadingOver,
  setGravesLoadingStart,
} from "../redux/graves/gravesReducer";
import {
  convertToBackModel,
  convertToFrontModel,
  updateGiftsOnGrave,
} from "../services/data-transformation/converting";
import { ORIGIN } from "../configs/urls/app/app-urls";
import { GRAVES_API_URL, PHOTOS_API_URL } from "../configs/urls/api/api-urls";
import { handleError } from "../services/errors/handleError";

export const loadGraves = async () => {
  try {
    store.dispatch(setGravesLoadingStart());
    const response = await axios.get(ORIGIN + GRAVES_API_URL);
    const gravesConverted = response.data.graves
      ?.filter((item) => item !== undefined)
      .map((grave) => convertToFrontModel(grave));
    store.dispatch(setGraves(gravesConverted));
    store.dispatch(setGravesLoadingOver());
    console.log(gravesConverted);
  } catch (e) {
    handleError(e);
  }
};

export const reloadGraves = async () => {
  try {
    store.dispatch(setGravesLoadingStart());
    await loadGraves();
    store.dispatch(setGravesLoadingOver());
  } catch (e) {
    store.dispatch(setGravesLoadingOver());
    handleError(e);
  }
};

const updatePhotos = async (photos) => {
  const formData = new FormData();
  photos.forEach((file) => {
    formData.append("multi-files", file.file, file.file.name);
  });
  photos = formData;
  return await axios
    .post(ORIGIN + PHOTOS_API_URL, formData, {
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    })
    .catch((e) => {
      handleError(e);
    });
};

export const postNewGrave = async (data) => {
  try {
    const res = await updatePhotos(data.photos);
    data.photos = res.data.photos;
    const readyToPost = convertToBackModel({ data });
    const response = await axios.post(ORIGIN + GRAVES_API_URL, readyToPost, {
      withCredentials: true,
    });
    return response;
  } catch (e) {
    handleError(e);
  }
};

export const deleteGrave = async (grave) => {
  return axios
    .delete(ORIGIN + GRAVES_API_URL + "/" + grave._id, {
      withCredentials: true,
    })
    .catch((e) => {
      handleError(e);
    });
};

export const updateGrave = (data, grave) => {
  return axios
    .patch(
      ORIGIN + GRAVES_API_URL + "/" + grave._id,
      updateGiftsOnGrave(data, grave)
    )
    .catch((e) => {
      handleError(e);
    });
};
