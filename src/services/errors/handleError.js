import store from "../../redux/store";
import { setUserLoading } from "../../redux/user/userReducer";
import { showError } from "./showError";

export const handleError = (e) => {
  store.dispatch(setUserLoading(false));
  console.error(e);
  console.trace(e);
  const error = e?.response?.data || e;
  showError(error);
  throw new Error(error?.message);
};
