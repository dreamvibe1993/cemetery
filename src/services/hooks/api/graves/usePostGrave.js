import React from "react";
import axios from "axios";
import { updatePhotos } from "../../../../api/photos";
import {
  GRAVES_API_URL,
  PHOTOS_API_URL,
} from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import { convertToBackModel } from "../../../data-transformation/converting";
import { handleError } from "../../../errors/handleError";

export const usePostGrave = () => {
  const CancelToken = axios.CancelToken;

  const cancelFnRef = React.useRef(null);

  const cancelPostGraveRequest = () => {
    if (typeof cancelFnRef.current === "function")
      cancelFnRef.current("499: Request to get graves was cancelled!");
  };

  const postNewGrave = async (data) => {
    try {
      const res = await updatePhotos(
        data.photos,
        ORIGIN + PHOTOS_API_URL + "/graves"
      );
      data.photos = res.data.photos;
      const readyToPost = convertToBackModel({ data });
      const response = await axios.post(ORIGIN + GRAVES_API_URL, readyToPost, {
        cancelToken: new CancelToken(function executor(c) {
          cancelFnRef.current = c;
        }),
        withCredentials: true,
      });
      return response;
    } catch (e) {
      handleError(e);
    }
  };

  return [postNewGrave, cancelPostGraveRequest];
};
