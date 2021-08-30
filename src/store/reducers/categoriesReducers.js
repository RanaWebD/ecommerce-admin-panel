import { GET_CATEGORIES } from "../actionTypes";

export default function(state = { categories: [] }, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      return state;
  }
}
