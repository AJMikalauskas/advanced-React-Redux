import { configureStore } from "@reduxjs/toolkit";
import showingCartModalSlice from "./modal";

const store = configureStore({
    reducer: {cartModal: showingCartModalSlice.reducer}
});

export default store;