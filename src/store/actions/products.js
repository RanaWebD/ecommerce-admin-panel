import axios from "axios";
import { addError } from "./errors";
import { apiCall } from "../../services/api";
import {
  LOAD_PRODUCTS,
  POST_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT
} from "../actionTypes";

export const verifyPincode = pincode => {
  return dispatch => {
    return apiCall("get", `/check-pincode/${pincode}`)
      .then(res => {
        if (res.delivery_codes.length) {
          localStorage.setItem("verifyedPincode", "true");
        } else {
          localStorage.setItem("verifyedPincode", "false");
        }
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
  };
};

export const getProduct = product_id => {
  return dispatch => {
    return apiCall("get", `/api/products/${product_id}`)
      .then(res => {
        dispatch({
          type: GET_PRODUCT,
          payload: res
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const getProducts = () => {
  return dispatch => {
    return apiCall("get", "/api/products")
      .then(res => {
        dispatch({
          type: LOAD_PRODUCTS,
          payload: res
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

// Admin Panel requests
export const postProduct = (user_id, product) => {
  console.log("product", product);
  // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
  var config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  return dispatch => {
    return axios
      .post(`/api/admin/users/${user_id}/products`, product, config)
      .then(res => {
        dispatch({
          type: POST_PRODUCT,
          payload: res
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const deleteProduct = (user_id, product_id) => {
  return dispatch => {
    return apiCall(
      "delete",
      `/api/admin/users/${user_id}//products/${product_id}`
    )
      .then(res => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: product_id
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

export const updateProduct = (user_id, product_id, product) => {
  return dispatch => {
    return apiCall(
      "put",
      `/api/admin/users/${user_id}/products/${product_id}`,
      product
    )
      .then(res => {
        dispatch({
          type: POST_PRODUCT,
          payload: res
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};
