import axios from "axios";
import { USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import store from "../redux/store";
import { setUserAuth, setUser } from "../redux/user/userReducer";
import { authorizeUser } from "../services/auth/logInUser";
import { handleError } from "../services/errors/handleError";

export const createUser = async (name, email, password, passwordConfirm) => {
  try {
    await axios.post(ORIGIN + USER_API_URL + "/signup", {
      name,
      email,
      password,
      passwordConfirm,
    });
  } catch (e) {
    handleError(e.response.data);
  }
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
    store.dispatch(setUserAuth(false));
    store.dispatch(setUser({}));
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
    store.dispatch(setUserAuth(false));
    store.dispatch(setUser({}));
  } catch (e) {
    store.dispatch(setUserAuth(null));
    store.dispatch(setUser({}));
    handleError(e.response.data);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(ORIGIN + USER_API_URL + "/user", {
      withCredentials: true,
    });
    authorizeUser(response.data.user);
    return response;
  } catch (e) {
    handleError(e.response.data);
  }
};
