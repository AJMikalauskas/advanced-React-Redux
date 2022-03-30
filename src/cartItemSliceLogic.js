import { useSelector } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { showingCartModalActions } from "./store/modal";

const cartItemSlice = createSlice({
  name: "cartItemsLogic",
  initialState: {
    cartItems: [],
    totalOverallAmount: 0,
    totalCostAmt: 0,
  },
  reducers: {
    addItem(state, action) {
      // This is very different from context already since you can push it on without changes or errors being caused
      // This looks very different from the reducer functions because the ... operator is used more and is used to store
      // and then adding an item, you can't and shouldn't change the states at all and if adding you use .concat() and not .push()

      // Redux handles it so .push() and the ... operator don't have to be used (what I would consider incessantly).
      // No manipulation of old state due to redux toolkit

      // newItem would store specific properties, send up as object with price, name, and more
      const newItem = action.payload;
      console.log(newItem);
      // adding check for an existingItem with the same id
      const existingItem = state.cartItems.find(
        (item) => item.itemId === newItem.itemId
      );
      //console.log(existingItem);
      if (!existingItem) {
        // Include the specific properties of the newItem Object -> not just .push(newItem),
        //properties include name, id, price, quantity/amount and overall price of item(s)
        state.cartItems.push({
          itemName: newItem.itemName,
          itemId: newItem.itemId,
          price: newItem.price,
          amount: 1,
          totalPrice: newItem.price,
        });
        state.totalOverallAmount += 1;
        state.totalCostAmt += newItem.price;
      } else {
        // Once again you don't have to store the old data in a new variable and update something beyond the state
        // This can be kind of confusing considering the fact the food oredering app was 2 sections ago and not adjusting state is still resonating
        // While to adjust state with redux is perfectly ok.
        existingItem.amount += 1;
        existingItem.totalPrice += newItem.price;
        state.totalOverallAmount += 1;
        state.totalCostAmt += newItem.price;
      }
      //const lastSnapshotOfCart = state.cartItems;
    },
    removeItem(state, action) {
      // The action here is most likely an id, but is only really useful if multiple items exist overall
      // Option to remove and then run if the amount is 0, than to remove item completely by slice?
      const removingItemId = action.payload;
      const removeExistingItem = state.cartItems.find(
        (item) => item.itemId === removingItemId.itemId
      );
      //Item Specific Amount and Price Removals
      removeExistingItem.amount -= 1;
      removeExistingItem.totalPrice -= removeExistingItem.price;

      //Overall/Total Amount and Price Removals
      state.totalOverallAmount -= 1;
      state.totalCostAmt -= removeExistingItem.price;
      //const newCartItems = cartItems.filter((cartItem) => cartItem.amount )

      // This is probably the simplest way to write this, only runs through if statement if the amount is 0 rather than filtering for no reason
      if (removeExistingItem.amount === 0) {
        // This filtered solution is probably simpler and quicker than to run an (for and if loop) to find the id and then splice the element from the array
        const newCartItems = state.cartItems.filter(
          (cartItem) => cartItem.amount > 0
        );
        // This statement below is only possible through redux
        state.cartItems = newCartItems;
      }
    },
  },
});

// This is to create an action creator thunk, moved this function name from App.js to here -> redux auto makes these by reducer functions above such as
// removeItem() and addItem()
// could reutnr object like one's above but you can also return a function from a function with dispatch param
export const sendCartData = (cartStateTracker) => {
    //const cartStateTracker = useSelector(state => state.cartItemLogic);
  //return{ type: '', payload:}
  // can return as async anonymous function or cretae new async function in the return function and put async there  
    // I ended up making this async due to the try catch of the sendRequest nested function
        // Within the try catch, the try will call the function overall and if it succeeds, call dispatch to succesful notification
            // if catch is called, send error notification

    // instantly once this function is called, returns a function which shows the notification of a loading State notification
        // Send request via async/await fetch call. it also runs a try catch call after the overall sendRequest function is called
            // if try is succesful, sends success notification else fail exists and error notification shows
  return async(dispatch) => {
    dispatch(
      showingCartModalActions.showNotification({
        status: "Pending...",
        title: "Request Is Loading",
        message: "Your Request is being processed!",
      })
    );

    // Need async function this is just the 2nd option as mentioned above
    const sendRequest = async() => {
        //const cartStateTracker = useSelector(state => state.cartItemLogic);
    const response = await fetch("https://advanced-redux-a16d1-default-rtdb.firebaseio.com/cartItems.json ",
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      // This is just a minor useSelector(), stores the cartItemLogic which contains the overallquantity, overallCost, and cartItems Array
        // sisnce it has a react hook it can only be contained within a react component or customm hook, how to use here?
            // we will pass these cartStateTracker via the sendCartData function, call sendCartData with correct logic of the cart from this
                // can't use useSelector() in this slice.
      body: JSON.stringify(cartStateTracker)
    });

    if(!response.ok)
    {
      // Put error notificatio in here if fail occurs
      //setIfError(true);

      // Don't dispatch error here because other errors can occur in the fetch request, so this may not be as useful as if you .catch()
        // which will catch any errors from the whole async function.
      //dispatch(showingCartModalActions.showNotification({status: 'error',title: "Request Failed!", message: "Your Request failed to Load due to an error!"}));
      throw new Error('Sending Cart Data Failed!');
    }
};

try {
    // Can only be possible of await if the return function is async so this can be await.
        // if succeed and continues request after function call, send success notification
            // elese if catch send fail notification
    await sendRequest();

    dispatch(showingCartModalActions.showNotification({status: 'success',title: "Request Succeeded!", message: "Your Request Succeeded in Loading!"}));
}
catch(error) {
    dispatch(showingCartModalActions.showNotification({status: 'error',title: "Request Failed", message: error.message}));
}
    //console.log(notification.status);
    //dispatch();
  };
};

export const cartItemSliceActions = cartItemSlice.actions;
export default cartItemSlice;
