import { setNotification } from "../../redux/app/appReducer";
import store from "../../redux/store";

export const showError = (e) => {
  store.dispatch(
    setNotification({
      text: e.message,
      withOptions: false,
    })
  );
};
