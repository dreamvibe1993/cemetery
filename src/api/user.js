import axios from "axios";
import { PHOTOS_API_URL, USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import store from "../redux/store";
import { setUserLoading } from "../redux/user/userReducer";
import { authorizeUser, dropUserData } from "../services/auth/logInUser";
import { handleError } from "../services/errors/handleError";
import { updatePhotos } from "./photos";

export const createUser = async (name, email, password, passwordConfirm) => {
  store.dispatch(setUserLoading(true));
  return axios
    .post(ORIGIN + USER_API_URL + "/signup", {
      name,
      email,
      password,
      passwordConfirm,
    })
    .then((res) => {
      store.dispatch(setUserLoading(false));
      return res;
    })
    .catch((e) => {
      handleError(e.response.data);
    });
};

export const logInUser = async (email, password) => {
  store.dispatch(setUserLoading(true));
  try {
    const response = await axios.post(
      ORIGIN + USER_API_URL + "/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    authorizeUser(response.data.user);
  } catch (e) {
    dropUserData();
    handleError(e.response.data);
  }
};

export const logOutUser = async () => {
  store.dispatch(setUserLoading(true));
  try {
    await axios.post(
      ORIGIN + USER_API_URL + "/logout",
      {},
      {
        withCredentials: true,
      }
    );
  } catch (e) {
    handleError(e.response.data);
  }
  dropUserData();
};

export const getUser = async () => {
  store.dispatch(setUserLoading(true));
  return axios
    .get(ORIGIN + USER_API_URL + "/user", {
      withCredentials: true,
    })
    .then((response) => authorizeUser(response.data.user));
};

export const updateUser = async (user) => {
  store.dispatch(setUserLoading(true));
  const res = await updatePhotos(
    user.photos,
    ORIGIN + PHOTOS_API_URL + "/user"
  );
  user.photos = res.data.photos;
  return axios
    .post(ORIGIN + USER_API_URL + "/updateMe", user, {
      withCredentials: true,
    })
    .then((response) => authorizeUser(response.data.user));
};
