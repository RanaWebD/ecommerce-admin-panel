import { addError } from "./errors";
import { apiCall } from "../../services/api";
import { GET_STAFFPICK, POST_STAFFPICK, UPDATE_STAFFPICK, DELETE_STAFFPICK } from "../actionTypes";

export function getStaffPick() {
  return dispatch => {
    return apiCall("get", "/api/staff_pick")
      .then(res => {
        console.log("res", res);
        dispatch({
          type: GET_STAFFPICK,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: "GET_STAFFPICK_REJECTED",
          payload: err
        });
      });
  };
}

export function postStaffPick(data) {
  return dispatch => {
    return apiCall("post", "/api/staff_pick", data)
      .then(res => {
        console.log("res", res);
        dispatch({
          type: POST_STAFFPICK,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: "POST_STAFFPICK_REJECTED",
          payload: err
        });
      });
  };
}


export function updateStaffPick(id, data) {
  return dispatch => {
    return apiCall("put", `/api/staff_pick/${id}`, data)
      .then(res => {
        console.log("res", res);
        dispatch({
          type: UPDATE_STAFFPICK,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: "UPDATE_STAFFPICK_REJECTED",
          payload: err
        });
      });
  };
}

export function deleteStaffPick(id) {
  return dispatch => {
    return apiCall("delete", `/api/staff_pick/${id}`)
      .then(res => {
        console.log("res", res);
        dispatch({
          type: DELETE_STAFFPICK,
          payload: res
        });
      })
      .catch(err => {
        dispatch({
          type: "DELETE_STAFFPICK_REJECTED",
          payload: err
        });
      });
  };
}
