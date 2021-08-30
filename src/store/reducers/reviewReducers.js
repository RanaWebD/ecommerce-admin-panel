"use strict"

//productS REDUCERS
export function reviews(state = { reviews: [] }, action) {
    switch (action.type) {
        case "GET_REVIEWS":
            return { ...state, reviews: [...action.payload] }
            break;
        
    }
    return state;
}