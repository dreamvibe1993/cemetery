import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setNotification,
  setNotificationToDefault,
} from "../../../redux/app/appReducer";
import { deleteGrave } from "../../../api/graves";
import { useLoadGraves } from "../api/graves/useLoadGraves";

export const useDeleteGrave = () => {
  const [getGraves] = useLoadGraves();
  const dispatch = useDispatch();
  const { notificationConfirm } = useSelector((state) => state.app);

  const [graveToDel, setGraveToDel] = React.useState(null);

  const deleteTomb = async (e, grave) => {
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
    deleteGrave(graveToDel).then(() => {
      dispatch(setNotificationToDefault());
      getGraves();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, notificationConfirm]);

  return (e, grave) => {
    deleteTomb(e, grave);
  };
};
