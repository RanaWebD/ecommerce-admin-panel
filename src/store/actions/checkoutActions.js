import {
  ADD_ADDRESS_TO_CHECKOUT_OBJECT,
  ADD_PAYMENT_MODE_TO_CHECKOUT_OBJECT
} from "../actionTypes";

export const addAddressToCheckoutObect = (address, history) => {
  return dispatch => {
    dispatch({
      type: ADD_ADDRESS_TO_CHECKOUT_OBJECT,
      payload: address
    });
    history.push("/checkout_summery");
  }
};

export const addPaymentModeToCheckoutObect = payment => {
    return dispatch => {
      dispatch({
        type: ADD_PAYMENT_MODE_TO_CHECKOUT_OBJECT,
        payload: payment
      })
    }
  };
  
