import axios from "axios";
import React from "react";
import { GRAVES_API_URL } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { updateGiftsOnGrave } from "../../../data-transformation/converting";
import { handleError } from "../../../errors/handleError";

export const useUpdateGrave = () => {
  const CancelToken = axios.CancelToken;

  const cancelFnRef = React.useRef(null);

  const cancelUpdateGraveRequest = () => {
    if (typeof cancelFnRef.current === "function")
      cancelFnRef.current("499: Request to update grave was cancelled!");
  };

  const updateGrave = (data, grave) => {
    return axios
      .patch(
        ORIGIN + GRAVES_API_URL + "/" + grave._id,
        updateGiftsOnGrave(data, grave),
        {
          withCredentials: true,
          cancelToken: new CancelToken(function executor(c) {
            cancelFnRef.current = c;
          }),
        }
      )
      .catch((e) => {
        handleError(e);
      });
  };

  return [updateGrave, cancelUpdateGraveRequest];
};
