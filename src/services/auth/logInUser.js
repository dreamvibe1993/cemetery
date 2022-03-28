import store from "../../redux/store";
import {
  setUser,
  setUserAsAdmin,
  setUserAsNotAdmin,
  setUserAuth,
  setUserLoading,
} from "../../redux/user/userReducer";

export const authorizeUser = (data) => {
  store.dispatch(setUserLoading(false));
  if (data.status === "error" || data.status === "fail") {
    dropUserData();
    throw new Error(data.status);
  }
  store.dispatch(setUserAuth(true));
  if (data.user.role === "admin") store.dispatch(setUserAsAdmin());
  const userData = {
    email: data.user.email,
    username: data.user.name,
    photos: data.user.photos,
    id: data.user._id,
  };
  store.dispatch(setUser(userData));
};

export const dropUserData = () => {
  store.dispatch(setUserAsNotAdmin());
  store.dispatch(setUserAuth(false));
  store.dispatch(setUser({}));
  store.dispatch(setUserLoading(false));
};
