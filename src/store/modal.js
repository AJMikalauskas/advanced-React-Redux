import { createSlice } from "@reduxjs/toolkit";

const initialCartModalState = {showingCart: false, notification: null};

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
        },
        // This is just to show onofification for HTTP request of PUT in APP.js file
        showNotification(state,action)
        {
            state.notification = {status: action.payload.status, title: action.payload.title, message: action.payload.message};
        }
    }
});

//showingCartModalSlice.actions.
export const showingCartModalActions = showingCartModalSlice.actions;
export default showingCartModalSlice;