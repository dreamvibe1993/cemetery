import axios from "axios";
import { USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import { authorizeUser, dropUserData } from "../services/auth/logInUser";
import { handleError } from "../services/errors/handleError";

export const createUser = async (name, email, password, passwordConfirm) => {
  return axios
    .post(ORIGIN + USER_API_URL + "/signup", {
      name,
      email,
      password,
      passwordConfirm,
    })
    .catch((e) => {
      handleError(e.response.data);
    });
};

export const logInUser = async (email, password) => {
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
  return axios
    .get(ORIGIN + USER_API_URL + "/user", {
      withCredentials: true,
    })
    .then((response) => authorizeUser(response.data.user));
};
