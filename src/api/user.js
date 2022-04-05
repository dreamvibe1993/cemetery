import axios from "axios";
import { USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import store from "../redux/store";
import { setUserAuth, setUserLoading } from "../redux/user/userReducer";
import { authorizeUser, dropUserData } from "../services/auth/logInUser";
import { handleError } from "../services/errors/handleError";

export const createMyProfile = async (
  name,
  email,
  password,
  passwordConfirm
) => {
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

export const logInMe = async (email, password) => {
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

export const logOutMe = async () => {
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

export const getMe = async (errHandleFn) => {
  store.dispatch(setUserLoading(true));
  return axios
    .get(ORIGIN + USER_API_URL + "/getMe", {
      withCredentials: true,
    })
    .then((response) => authorizeUser(response.data))
    .catch((e) => {
      console.log(e)
      if (errHandleFn) errHandleFn(e);
      store.dispatch(setUserAuth(false));
    })
    .finally(() => {
      store.dispatch(setUserLoading(false));
    });
};

export const updateMe = async (user) => {
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

export const deleteMe = async () => {
  store.dispatch(setUserLoading(true));
  return axios.delete(ORIGIN + USER_API_URL + "/deleteMe", {
    withCredentials: true,
  });
};

export const getUser = async (userId) => {
  store.dispatch(setUserLoading(true));
  return axios.get(ORIGIN + USER_API_URL + "/user/" + userId).finally(() => {
    store.dispatch(setUserLoading(false));
  });
};

export const sendChangePassEmail = async (email) => {
  return axios
    .post(
      ORIGIN + USER_API_URL + "/forgotPassword",
      { email },
      {
        withCredentials: true,
      }
    )
    .catch((e) => {
      handleError(e.response.data);
    });
};

export const resetPassword = async ({ token, password, passwordConfirm }) => {
  return axios.patch(ORIGIN + USER_API_URL + `/resetPassword/${token}`, {
    password,
    passwordConfirm,
  });
};
