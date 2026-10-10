import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      totalPrice: 0,
      itemPrice: 0,
      shippingAddress: {},
      paymentMethod: "cod",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const itemId = item._id;
      const itemFound = state.cartItems.find((i) => i._id == itemId);
      if (itemFound) {
        itemFound.qty = item.qty;
      } else {
        state.cartItems.push(item);
      }

      state.itemPrice = Number(
        state.cartItems.reduce((acc, x) => acc + x.qty * x.price, 0).toFixed(2),
      );
      state.shippingCharge = state.itemPrice >= 100 ? 0 : 10;
      state.taxPrice = Number((0.1 * state.itemPrice).toFixed(2));
      state.totalPrice =
        state.itemPrice + state.shippingCharge + state.taxPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id != id);

      state.itemPrice = Number(
        state.cartItems.reduce((acc, x) => acc + x.qty * x.price, 0).toFixed(2),
      );
      state.shippingCharge = state.itemPrice >= 100 ? 0 : 10;
      state.taxPrice = Number((0.1 * state.itemPrice).toFixed(2));
      state.totalPrice =
        state.itemPrice + state.shippingCharge + state.taxPrice;

      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;
export default cartSlice.reducer;
