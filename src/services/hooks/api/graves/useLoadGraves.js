import { useDispatch } from "react-redux";
import { loadGraves } from "../../../../api/graves";
import {
  setGraves,
  setGravesLoadingOver,
  setGravesLoadingStart,
} from "../../../../redux/graves/gravesReducer";
import { convertToFrontModel } from "../../../data-transformation/converting";
import { handleError } from "../../../errors/handleError";

export const useLoadGraves = () => {
  const dispatch = useDispatch();

  const getGraves = async () => {
    dispatch(setGravesLoadingStart());
    try {
      const response = await loadGraves();
      const gravesConverted = response.data.graves
        ?.filter((item) => item !== undefined)
        .map((grave) => convertToFrontModel(grave));
      dispatch(setGraves(gravesConverted));
      dispatch(setGravesLoadingOver());
    } catch (e) {
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

  return [getGraves, updateGraves];
};
