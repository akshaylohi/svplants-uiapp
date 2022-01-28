import backend from "./api";
import { toast } from "react-toastify";
import _ from "lodash";

import { GET_PLANT, GET_PLANTS, EDIT_PLANT, ADD_PLANT, DELETE_PLANT, WATER_PLANT, STOP_WATER_PLANT } from "./types";

export const getPlants = () => async (dispatch) => {
    try {
      const response = await backend.get("/api/Plants", {
      });
  
      dispatch({ type: GET_PLANTS, payload: response.data });
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };