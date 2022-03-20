import store from "../../redux/store";
import {
  setUser,
  setUserAsAdmin,
  setUserAsNotAdmin,
  setUserAuth,
} from "../../redux/user/userReducer";

export const authorizeUser = (user) => {
  store.dispatch(setUserAuth(true));
  if (user.role === "admin") store.dispatch(setUserAsAdmin());
  const userData = {
    email: user.email,
    username: user.name,
    id: user._id
  };
  store.dispatch(setUser(userData));
};

export const dropUserData = () => {
  store.dispatch(setUserAsNotAdmin())
  store.dispatch(setUserAuth(false));
  store.dispatch(setUser({}));
}