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
import { GRAVES_API_URL } from "../configs/urls/api/api-urls";

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
    console.error(e);
  }
};

export const reloadGraves = async () => {
  try {
    store.dispatch(setGravesLoadingStart());
    await loadGraves();
    store.dispatch(setGravesLoadingOver());
  } catch (e) {
    store.dispatch(setGravesLoadingOver());
    console.error(e);
  }
};

export const postNewGrave = async (data) => {
  console.log(data);
  try {
    data.photos = [];
    const readyToPost = convertToBackModel({ data });
    const response = await axios.post(ORIGIN + GRAVES_API_URL, readyToPost);
    return response;
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};

export const deleteGrave = async (grave) => {
  const t = store.getState();
  if (!t?.user?.isAdmin) return;
  return axios.delete(ORIGIN + GRAVES_API_URL + "/" + grave._id);
};

export const updateGrave = (data, grave) => {
  try {
    return axios.patch(
      ORIGIN + GRAVES_API_URL + "/" + grave._id,
      updateGiftsOnGrave(data, grave)
    );
  } catch (e) {
    console.error(e);
    console.trace(e);
  }
};
