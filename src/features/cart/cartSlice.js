import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // cart: [],
  cart: [],
  orderHistory: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem

      state.cart.push(action.payload);
    },
    addOrderToHistory(state, action) {
      // payload = newOrder

      state.orderHistory.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = id
      // filter will remove item from list card based on id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // first find the item that want to increase number
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      // increase number of item
      item.quantity = item.quantity + 1;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload= id
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity = item.quantity - 1;
      item.totalPrice = item.quantity * item.unitPrice;

      // if item.quantity === 0 it will call delete method and remove the item from list cart
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      // state.cart = state.cart.filter(
      //   (item) => item.pizzaId !== action.payload,
      // );
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  addOrderToHistory,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// having too many selectore function on larg
// application might make performance issue
// to fix this issue we can use reselect library
// which allow us to optimize these selectors

// will dispaly list of cart
export const getCart = (state) => state.cart.cart;

export const getUserName = (state) => state.user.username;

// reselect library
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// it will return the id of items that is equal with the id that we passed
// and check if it's true return quntity
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
