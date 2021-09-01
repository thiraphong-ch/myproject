import { ADD_TO_CART, CLEAR_ALL_CART } from "../actions/cartAction";

const initState = {
  cart: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  // return state;
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartR: action.payload.cartA,
        totalR: action.payload.totalA,
      };
    case CLEAR_ALL_CART:
      return {
        ...state,
        cartR: action.payload.cartAclear,
        totalR: action.payload.totalAclear,
      };

    default:
      return state;
  }
};

export default cartReducer;
