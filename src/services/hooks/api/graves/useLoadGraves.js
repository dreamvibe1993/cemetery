import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { GRAVES_API_URL } from "../../../../configs/urls/api/api-urls";
import { ORIGIN } from "../../../../configs/urls/app/app-urls";
import {
  setGraves,
  setGravesLoadingOver,
  setGravesLoadingStart,
} from "../../../../redux/graves/gravesReducer";
import { convertToFrontModel } from "../../../data-transformation/converting";
import { handleError } from "../../../errors/handleError";

export const useLoadGraves = () => {
  const dispatch = useDispatch();

  const CancelToken = axios.CancelToken;

  const cancelFnRef = React.useRef(null);

  const cancelRequest = () => {
    if (typeof cancelFnRef.current === "function")
      cancelFnRef.current("499: Request to get graves was cancelled!");
  };

  const getGraves = async () => {
    dispatch(setGravesLoadingStart());
    try {
      const response = await axios.get(ORIGIN + GRAVES_API_URL, {
        cancelToken: new CancelToken(function executor(c) {
          cancelFnRef.current = c;
        }),
      });
      const gravesConverted = response.data.graves
        ?.filter((item) => item !== undefined)
        .map((grave) => convertToFrontModel(grave));
      dispatch(setGraves(gravesConverted));
      dispatch(setGravesLoadingOver());
    } catch (e) {
      if (e.message.startsWith("499")) return console.error(e);
      handleError(e);
    }
  };

  const updateGraves = async () => {
    try {
      dispatch(setGravesLoadingStart());
      await getGraves();
      dispatch(setGravesLoadingOver());
    } catch (e) {
      dispatch(setGravesLoadingOver());
      handleError(e);
    }
  };

//   React.useEffect(() => {
//     return () => {
//       cancelRequest();
//     };
//   }, []);

  return [getGraves, updateGraves, cancelRequest];
};
