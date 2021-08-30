import {
  GET_ORDERS,
  POST_ORDER,
  TRACK_ORDER,
  CANCEL_ORDER,
  UPDATE_ORDER_STATUS
} from "../actionTypes";

//ORDER REDUCERS
export default (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      };
    case POST_ORDER:
      return {
        ...state,
        orders: action.payload
      };
    case TRACK_ORDER:
      return {
        ...state,
        orders: action.payload
      };
    case CANCEL_ORDER:
      return {
        ...state,
        orders: action.payload
      };
    case UPDATE_ORDER_STATUS:
      return {
        ...state,
        orders: action.payload
      };
    default:
      return state;
  }
};
