import { addError, removeError } from "./errors";
import { apiCall } from "../../services/api";
import {
  GET_DEPARTMENTS,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  POST_DEPARTMENT
} from "../actionTypes";

export function getDepartments() {
  return dispatch => {
    return apiCall("get", "/api/departments")
      .then(res => {
        dispatch({
          type: GET_DEPARTMENTS,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
}

export function postDepartment(user_Id, data) {
  return dispatch => {
    return apiCall("post", `/api/admin/users/${user_Id}/department`, data)
      .then(res => {
        dispatch({
          type: UPDATE_DEPARTMENT,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
}

export function deleteDepartment(user_Id, department_id) {
  return dispatch => {
    return apiCall(
      "delete",
      `/api/admin/users/${user_Id}/department/${department_id}`
    )
      .then(res => {
        dispatch({
          type: DELETE_DEPARTMENT,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
}

export function editDepartment(user_Id, data, department_id) {
  return dispatch => {
    return apiCall(
      "put",
      `/api/admin/users/${user_Id}/department/${department_id}`,
      data
    )
      .then(res => {
        dispatch({
          type: POST_DEPARTMENT,
          payload: res
        });
        dispatch(removeError());
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
}
