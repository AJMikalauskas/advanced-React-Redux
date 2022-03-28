import { createSlice } from "@reduxjs/toolkit";

const initialCartModalState = {showingCart: false};

const showingCartModalSlice = createSlice({
    name:"cartModal",
    initialState: initialCartModalState,
    reducers: {
        showCartModal(state) {
            state.showingCart = true;
            console.log(state.showingCart);
        },
        stopShowingCartModal(state) {
            state.showingCart = false;
        }
    }
});

//showingCartModalSlice.actions.
export const showingCartModalActions = showingCartModalSlice.actions;
export default showingCartModalSlice;