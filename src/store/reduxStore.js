import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from "../cartItemSliceLogic";
import showingCartModalSlice from "./modal";

const store = configureStore({
    reducer: {cartModal: showingCartModalSlice.reducer, cartItemLogic: cartItemSlice.reducer}
});

export default store;