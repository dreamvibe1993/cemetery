import axios from "axios";
import { USER_API_URL } from "../configs/urls/api/api-urls";
import { ORIGIN } from "../configs/urls/app/app-urls";
import store from "../redux/store";
import { setUserAuth, setUser } from "../redux/user/userReducer";

export const createUser = async (name, email, password, passwordConfirm) => {
  try {
    await axios.post(ORIGIN + USER_API_URL + "/signup", {
      name,
      email,
      password,
      passwordConfirm,
    });
  } catch (e) {
    console.error(e);
  }
  console.log(name, email, password, passwordConfirm);
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
    const userData = {
      email: response.data.user.email,
      username: response.data.user.name,
    };
    store.dispatch(setUserAuth(true));
    store.dispatch(setUser(userData));
  } catch (error) {
    store.dispatch(setUserAuth(false));
    store.dispatch(setUser({}));
    console.error(error);
    console.trace(error);
    alert(error);
  }
};

export const logOutUser = async () => {
  try {
    await axios.post(ORIGIN + USER_API_URL + "/sign-out");
    console.log("user signed out");
    store.dispatch(setUserAuth(false));
    store.dispatch(setUser({}));
  } catch (error) {
    store.dispatch(setUserAuth(null));
    store.dispatch(setUser({}));
    console.error(error);
    console.trace(error);
    alert(error);
  }
};

export const checkUserAuth = async () => {};
