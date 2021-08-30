import { addError, removeError } from "./errors";
import { apiCall } from "../../services/api";
import {
  GET_GENRES,
  UPDATE_GENRE,
  DELETE_GENRE,
  POST_GENRE
} from "../actionTypes";

export function getGenres() {
  return dispatch => {
    return apiCall("get", "/api/genres")
      .then(res => {
        dispatch({
          type: GET_GENRES,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => dispatch(addError(err.message)));
  };
}

export function postGenre(user_id, data) {
  return dispatch => {
    return apiCall("post", `/api/admin/users/${user_id}/genre`, data)
      .then(res => {
        dispatch({
          type: POST_GENRE,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => dispatch(addError(err.message)));
  };
}

export function deleteGenre(user_id, genre_id) {
  return dispatch => {
    return apiCall("delete", `/api/admin/users/${user_id}/genre/${genre_id}`)
      .then(res => {
        dispatch({
          type: DELETE_GENRE,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => dispatch(addError(err.message)));
  };
}

export function dGenre(user_id, genre_id) {
  console.log("did it, did it!");
  return dispatch => {
    return apiCall("delete", `/api/admin/users/${user_id}/genre/${genre_id}`)
      .then(res => {
        console.log("res", res);
        dispatch({
          type: DELETE_GENRE,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => dispatch(addError(err.message)));
  };
}

export function editGenre(user_id, data, genre_id) {
  return dispatch => {
    return apiCall("put", `/api/admin/users/${user_id}/genre/${genre_id}`, data)
      .then(res => {
        dispatch({
          type: UPDATE_GENRE,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => dispatch(addError(err.message)));
  };
}
