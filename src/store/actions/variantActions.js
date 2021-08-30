import axios from "axios";

export const createVariant = (user_id, data) => {
  console.log("fjksdlljfjljasdlf",data)
    // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    var config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    return dispatch => {
      return axios
        .post(`/api/admin/users/${user_id}/variant`, data, config)
        .then(res => {
          console.log("createdVariant", res)
          // dispatch({
          //   type: _PRODUCT,
          //   payload: res
          // });
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };

export const updateVariant = (user_id, variant_id, updatedData) => {
    // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
    var config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    return dispatch => {
      return axios
        .put(`/api/admin/users/${user_id}/variant/${variant_id}`, updatedData, config)
        .then(res => {
          console.log("updatedVariant", res)
          // dispatch({
          //   type: _PRODUCT,
          //   payload: res
          // });
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };

  export const deleteVariant = (user_id, variant_id) => {
    return dispatch => {
      return axios
        .delete(`/api/admin/users/${user_id}/variant/${variant_id}`)
        .then(res => {
          console.log("deleteVariant", res)
          // dispatch({
          //   type: _PRODUCT,
          //   payload: res
          // });
        })
        .catch(err => {
          console.log(err.message);
        });
    };
  };