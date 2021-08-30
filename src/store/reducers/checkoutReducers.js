import {
  ADD_ADDRESS_TO_CHECKOUT_OBJECT,
  ADD_PAYMENT_MODE_TO_CHECKOUT_OBJECT
} from "../actionTypes";

const DEFAULT_STATE = {
  shippingAddress: {},
  payment: {}
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_ADDRESS_TO_CHECKOUT_OBJECT:
      return { ...state, shippingAddress: action.payload };
    case ADD_PAYMENT_MODE_TO_CHECKOUT_OBJECT:
    return {...state, payment: action.payload}
      default:
      return state;
  }
};
