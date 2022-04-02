import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setNotification,
  setNotificationToDefault,
} from "../../../../redux/app/appReducer";
import { useLoadGraves } from "./useLoadGraves";
import axios from "axios";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { GRAVES_API_URL } from "../../../../configs/urls/api/api-urls";
import { handleError } from "../../../errors/handleError";

export const useDeleteGrave = () => {
  const [getGraves] = useLoadGraves();
  const dispatch = useDispatch();
  const { notificationConfirm } = useSelector((state) => state.app);

  const [graveToDel, setGraveToDel] = React.useState(null);

  const CancelToken = axios.CancelToken;

  const cancelFnRef = React.useRef(null);

  const cancelDeleteGraveRequest = () => { // need to be fixed
    if (graveToDel && typeof cancelFnRef.current === "function")
      cancelFnRef.current("499: Request to get graves was cancelled!");
  };

  const deleteGrave = async (e, grave) => {
    e.stopPropagation();
    dispatch(
      setNotification({
        text:
          "Are you sure you want to delete the grave of " + grave.name + "?",
        withOptions: true,
        options: [
          { text: "yes", meaning: true },
          { text: "no", meaning: false },
        ],
      })
    );
    setGraveToDel(grave);
  };

  React.useEffect(() => {
    if (notificationConfirm === null) return;
    if (notificationConfirm === false) {
      return dispatch(setNotificationToDefault());
    }
    axios
      .delete(ORIGIN + GRAVES_API_URL + "/" + graveToDel._id, {
        withCredentials: true,
        cancelToken: new CancelToken(function executor(c) {
          cancelFnRef.current = c;
        }),
      })
      .catch((e) => {
        handleError(e);
      })
      .then(() => {
        dispatch(setNotificationToDefault());
        getGraves();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notificationConfirm]);

  return [deleteGrave, cancelDeleteGraveRequest];
};
