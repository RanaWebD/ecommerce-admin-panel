import { GET_CART, POST_CART } from "../actionTypes";

//CART REDUCERS
export default (state = { cart: {} }, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };
    case POST_CART:
      return {
        ...state,
        cart: action.payload
      };
    default:
      return state;
  }
};
