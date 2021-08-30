import { addError, removeError } from "./errors";
import { apiCall } from "../../services/api";
import {
  GET_CATEGORIES,
  POST_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from "../actionTypes";

export function getCategories() {
  return dispatch => {
    return apiCall("get", "/api/categories")
      .then(res => {
        dispatch({
          type: GET_CATEGORIES,
          payload: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function postCategory(user_id, data) {
  return dispatch => {
    return apiCall("post", `/api/admin/users/${user_id}/categories`, data)
      .then(res => {
        dispatch({
          type: UPDATE_CATEGORY,
          payload: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deleteCategory(user_id, category_id) {
  return dispatch => {
    return apiCall(
      "delete",
      `/api/admin/users/${user_id}/categories/${category_id}`
    )
      .then(res => {
        dispatch({
          type: DELETE_CATEGORY,
          payload: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function editCategory(user_id, data, selectedCategory_id) {
  return dispatch => {
    return apiCall(
      "put",
      `/api/admin/users/${user_id}/categories/${selectedCategory_id}`,
      data
    )
      .then(res => {
        dispatch({
          type: POST_CATEGORY,
          payload: res
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}
