import backend from "./api";
import { toast } from "react-toastify";
import _ from "lodash";

import { GET_PLANT, GET_PLANTS, EDIT_PLANT, ADD_PLANT, DELETE_PLANT, WATER_PLANT, STOP_WATER_PLANT } from "./types";

export const getPlants = () => async (dispatch) => {
    console.log("action hit");
    try {
      const response = await backend.get("/api/Plants", {
      });
      console.log("response data: ", response.data);
      dispatch({ type: GET_PLANTS, payload: response.data });
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const waterPlant = (plantId) => async (dispatch) => {
    console.log("waterplant action hit");
    try {
      backend.get("/api/Plants/water/"+plantId, {
      })
      .then(response=>{
        console.log("response data: ", response.data);
        dispatch({ type: WATER_PLANT, payload: response.data});
        toast.success("Watering started");
      }).catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const stopWaterPlant = (plantId) => async (dispatch) => {
    console.log("stopwaterplant action hit");
    try {
      backend.get("/api/Plants/stopWatering/"+plantId, {
      })
      .then(response=>{
        console.log("response data: ", response.data);
        dispatch({ type: STOP_WATER_PLANT, payload: response.data});
        toast.success("Watering stopped");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

  export const addPlant = (plant) => async (dispatch) => {
    console.log("add plant action hit");
    try {
      backend.post("/api/Plants", plant)
      .then(response=>{
        console.log("response data: ", response.data);
        dispatch({ type: ADD_PLANT, payload: response.data});
        toast.success("Plant successfully added");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };

    export const deletePlant = (plant) => async (dispatch) => {
    console.log("add plant action hit");
    try {
      backend.delete("/api/Plants/"+plant.plantId)
      .then(response=>{
        console.log("response data: ", response.status);
        dispatch({ type: DELETE_PLANT, payload: plant});
        toast.success("Plant successfully deleted");
      })
      .catch(err=> toast.error(err));
      
    } catch (error) {
      if (!_.isEmpty(error)) toast.error(error.response.data.message);
    }
  };