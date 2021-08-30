import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_REVIEWS, REMOVE_REVIEW, POST_REVIEW } from "../actionTypes";

export const removeReview = (user_id, review_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/reviews/${review_id}`)
      .then((res) => dispatch({
        type: REMOVE_REVIEW,
        payload: res
      }))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const getReviews = (product_id) => {
  return dispatch => {
    return apiCall("GET", `/api/products/${product_id}`)
      .then(res => {
        dispatch({
            type: LOAD_REVIEWS,
            payload: res
          });
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const postNewReview = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {
        dispatch({type: POST_REVIEW,
        payload: res})
    })
    .catch(err => addError(err.message));

};
