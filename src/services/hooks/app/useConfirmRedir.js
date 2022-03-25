import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setNotification,
  setNotificationToDefault,
} from "../../../redux/app/appReducer";

export const useConfirmRedir = () => {
  const dispatch = useDispatch();
  const { notificationConfirm } = useSelector((state) => state.app);
  const [functions, setFunctions] = React.useState([() => {}]);

  const showNotif = async (text) => {
    dispatch(
      setNotification({
        text,
        withOptions: true,
        options: [
          { text: "yes", meaning: true },
          { text: "no", meaning: false },
        ],
      })
    );
  };

  React.useEffect(() => {
    if (notificationConfirm === null) return;
    if (notificationConfirm === true) {
      functions.forEach((fn) => fn());
    }
    dispatch(setNotificationToDefault());
  }, [dispatch, functions, notificationConfirm]);

  return (text, newFunction) => {
    showNotif(text);
    setFunctions((prev) => [...prev, newFunction]);
  };
};
