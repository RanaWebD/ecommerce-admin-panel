import { apiCall } from "../../services/api";
import {
  POST_ORDER,
  GET_ORDERS,
  CANCEL_ORDER,
  TRACK_ORDER,
  UPDATE_ORDER_STATUS
} from "../actionTypes";

export const getOrders = user_id => {
  return dispatch => {
    apiCall("get", `/api/admin/users/${user_id}/orders`).then(res => {
      dispatch({
        type: GET_ORDERS,
        payload: res
      });
    });
  };
};

export const cancelOrder = (user_id, order_id) => {
  return dispatch => {
    apiCall("put", `/api/admin/users/${user_id}/orders/${order_id}`).then(
      res => {
        dispatch({
          type: CANCEL_ORDER,
          payload: res
        });
      }
    );
  };
};

export const updateOrderState = (user_id, order_id, orderSatatusdata) => {
  return dispatch => {
    apiCall(
      "put",
      `/api/admin/users/${user_id}/orders/${order_id}`,
      orderSatatusdata
    ).then(res => {
      dispatch({
        type: UPDATE_ORDER_STATUS,
        payload: res
      });
    });
  };
};
