export const cartReducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCTS":
        return {...state, products: action.payload};
      case "ADD_TO_CART":
        let lineIndex = state.cart.findIndex(i => i.id === action.payload.id);
        if (lineIndex === -1) {
          return {
            ...state, cart: [{...action.payload}, ...state.cart]
          }
        } else {
          state.cart[lineIndex].qty++;
        }
        return {...state};
      case
      "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload.id)
        };
      case
      "CHANGE_CART_QTY":
        return {
          ...state,
          cart: state.cart.filter((c) =>
            c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
          )
        };
      default:
        break;
    }
  }
;
