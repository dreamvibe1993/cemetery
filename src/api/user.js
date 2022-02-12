import axios from "axios";
import store from "../redux/store";
import { setUserAuth, setUser } from "../redux/user/userReducer";

const LOCALHOST = "http://localhost:8888";
const USER_API_URL = "/api/v1/users";

export const createUser = async (email, password, username) => {
  try {
    const response = await axios.post(LOCALHOST + USER_API_URL, {
      email,
      password,
      username,
    });
  } catch (e) {
    console.error(e);
  }
};

export const logInUser = async (email, password) => {
  try {
    const response = await axios.post(LOCALHOST + USER_API_URL + "/auth", {
      email,
      password,
    });
    const userData = {
      email: response.data.email,
      username: response.data.username,
    };
    if (response?.data?.isAdmin) {
      userData.isAdmin = true;
    }
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
    await axios.post(LOCALHOST + USER_API_URL + "/sign-out");
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

export const checkUserAuth = async () => {
  try {
    const response = await axios.get(LOCALHOST + USER_API_URL + "/auth");
    if (response.data.creds) {
      console.log("signed in");
      const { email, username } = response.data.creds;
      store.dispatch(setUserAuth(true));
      store.dispatch(
        setUser({
          email,
          username,
          uid: 777,
        })
      );
    } else {
      console.log("signed out");
      store.dispatch(setUserAuth(false));
      store.dispatch(setUser({}));
    }
  } catch (error) {
    store.dispatch(setUserAuth(null));
    store.dispatch(setUser({}));
    console.error(error);
    console.trace(error);
    alert(error);
  }
};
