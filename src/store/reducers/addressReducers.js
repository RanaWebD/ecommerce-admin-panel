import { GET_ADDRESS, POST_ADDRESS, REMOVE_ADDRESS } from "../actionTypes";

//productS REDUCERS
export default (state = { address: [] }, action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return { ...state, address: [...action.payload] };
    case POST_ADDRESS:
      //let products = state.products.concat(action.payload);
      //return {products};
      return { ...state, address: [...action.payload] };
    case REMOVE_ADDRESS:
      return { ...state, address: [...action.payload] };
    default:
      return state;
  }
};
