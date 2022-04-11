import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { deleteMe, /*logOutMe*/ } from "../../../../api/user";
// import { routes } from "../../../../configs/urls/app/app-urls";

import {
  setNotification,
  setNotificationToDefault,
} from "../../../../redux/app/appReducer";

export const useDeleteMe = () => {
  const dispatch = useDispatch();
  const { notificationConfirm, notification } = useSelector(
    (state) => state.app
  );
  // const navigate = useNavigate();

  const cancelFnRef = React.useRef(null);

  const cancelDeleteMyAccRequest = () => {
    // need to be fixed
    if (typeof cancelFnRef.current === "function")
      cancelFnRef.current("499: Request to delete this account was cancelled!");
  };

  const deleteMyProfile = async (e, grave) => {
    e.stopPropagation();
    dispatch(
      setNotification({
        type: "deleting",
        text: "Are you sure you want to delete your account?",
        withOptions: true,
        options: [
          { text: "yes", meaning: true },
          { text: "no", meaning: false },
        ],
      })
    );
  };

  React.useEffect(() => {
    if (notification.type !== "deleting") return;
    if (notificationConfirm === null) return;
    if (notificationConfirm === false) {
      return dispatch(setNotificationToDefault());
    }
    deleteMe().then(() => {
      dispatch(setNotificationToDefault());
      window.location.reload();
      //   logOutMe().then(() => {
      //     navigate(routes.root);
      //   });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notificationConfirm]);

  return [deleteMyProfile, cancelDeleteMyAccRequest];
};
