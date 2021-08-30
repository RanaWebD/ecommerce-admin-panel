import {
  LOAD_PRODUCTS,
  POST_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT
} from "../actionTypes";

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

//productS REDUCERS
export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      console.log(action.payload);
      return { ...state, products: [...action.payload] };
      break;
    case POST_PRODUCT:
      //let products = state.products.concat(action.payload);
      //return {products};
      return { products: [...state.products, ...action.payload] };
      break;
    case DELETE_PRODUCT:
      // Create a copy of the current array of products
      const currentproductToDelete = [...state.products];
      // Determine at which index in products array is the product to be deleted
      const indexToDelete = currentproductToDelete.findIndex(function(product) {
        return product._id === action.payload._id;
      });
      // use slice to remove the product at the specified index
      return {
        products: [
          ...currentproductToDelete.slice(0, indexToDelete),
          ...currentproductToDelete.slice(indexToDelete + 1)
        ]
      };
    case "UPDATE_PRODUCTS":
      // Create a copy of the current array of products
      const currentproductToUpdate = [...state.products];
      // Determine at which index in products array is the product to be deleted
      const indexToUpdate = currentproductToUpdate.findIndex(function(product) {
        return product._id === action.payload._id;
      });

      // create a new product object with the new values and with the same array index of the item we want
      // to replace. To achieve this we will use ...spread but we could use concat method too
      const newproductToUpdate = {
        ...currentproductToUpdate[indexToUpdate],
        title: action.payload.title
      };
      // use slice to remove the product at the specified index
      return {
        products: [
          ...currentproductToUpdate.slice(0, indexToUpdate),
          newproductToUpdate,
          ...currentproductToUpdate.slice(indexToUpdate + 1)
        ]
      };
  }
  return state;
};
