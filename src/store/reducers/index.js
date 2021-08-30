import { combineReducers } from "redux";
//HERE IMPORT REDUCERS TO BE COMBINED
import departmentReducer from "./departmentReducers";
import genreReducer from "./genreReducers";
import categoriesReducer from "./categoriesReducers";
import { productsReducer, productReducer } from "./ProductsReducer";
import cartReducer from "./cartReducer";
// import { reviews } from './reviewReducers';
// import authReducer from './authReducer';
import addressReducer from "./addressReducers";
import checkoutReducer from "./checkoutReducers";
import errors from "./errors";
import orderReducer from "./orderReducers";
import currentUser from "./currentUser";

const rootReducer = combineReducers({
  errors,
  departments: departmentReducer,
  genres: genreReducer,
  product: productReducer,
  products: productsReducer,
  categories: categoriesReducer,
  address: addressReducer,
  cart: cartReducer,
  checkoutObject: checkoutReducer,
  orders: orderReducer,
  currentUser
});

export default rootReducer;
