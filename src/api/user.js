import axios from "axios";
import { USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import store from "../redux/store";
import { setUserLoading } from "../redux/user/userReducer";
import { authorizeUser, dropUserData } from "../services/auth/logInUser";
import { handleError } from "../services/errors/handleError";

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
    })
    .finally(() => {
      store.dispatch(setUserLoading(false));
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
    authorizeUser(response.data);
  } catch (e) {
    dropUserData();
    handleError(e.response.data);
  } finally {
    store.dispatch(setUserLoading(false));
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
    .then((response) => authorizeUser(response.data))
    .finally(() => {
      store.dispatch(setUserLoading(false));
    });
};

export const updateUser = async (user) => {
  store.dispatch(setUserLoading(true));
  return axios
    .patch(ORIGIN + USER_API_URL + "/updateMe", user, {
      withCredentials: true,
    })
    .then((response) => authorizeUser(response.data))
    .finally(() => {
      store.dispatch(setUserLoading(false));
    });
};

export const changeUserPassword = async (user) => {};
