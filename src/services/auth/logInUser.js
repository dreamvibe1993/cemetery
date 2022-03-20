import store from "../../redux/store";
import {
  setUser,
  setUserAsAdmin,
  setUserAuth,
} from "../../redux/user/userReducer";

export const authorizeUser = (user) => {
  store.dispatch(setUserAuth(true));
  if (user.role === "admin") store.dispatch(setUserAsAdmin());
  const userData = {
    email: user.email,
    username: user.name,
  };
  store.dispatch(setUser(userData));
};
