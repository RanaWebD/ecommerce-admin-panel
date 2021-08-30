import { GET_DEPARTMENTS } from "../actionTypes";

export default function(state = { departments: [] }, action) {
  switch (action.type) {
    case GET_DEPARTMENTS:
      return { ...state, departments: [...action.payload] };
    default:
      return state;
  }
}
