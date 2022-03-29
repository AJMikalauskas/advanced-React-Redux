import { createSlice } from "@reduxjs/toolkit";

const cartItemSlice = createSlice({
    name: 'cartItemsLogic',
    initialState: {
        cartItems: [],
        totalOverallAmount: 0,
        totalCostAmt: 0
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
            const existingItem = state.cartItems.find(item => item.itemId === newItem.itemId);
            //console.log(existingItem);
            if(!existingItem) {
                // Include the specific properties of the newItem Object -> not just .push(newItem), 
                    //properties include name, id, price, quantity/amount and overall price of item(s)
                state.cartItems.push({itemName: newItem.itemName,itemId: newItem.itemId, price: newItem.price, amount: 1, totalPrice: newItem.price});
                state.totalOverallAmount += 1;
                state.totalCostAmt += newItem.price;
            }
            else
            {
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
        removeItem(state,action) {
            // The action here is most likely an id, but is only really useful if multiple items exist overall
                // Option to remove and then run if the amount is 0, than to remove item completely by slice?
            const removingItemId = action.payload;
            const removeExistingItem = state.cartItems.find(item => item.itemId === removingItemId.itemId);
            //Item Specific Amount and Price Removals
            removeExistingItem.amount -= 1;
            removeExistingItem.totalPrice -= removeExistingItem.price;

            //Overall/Total Amount and Price Removals
            state.totalOverallAmount -= 1;
            state.totalCostAmt -= removeExistingItem.price;
            //const newCartItems = cartItems.filter((cartItem) => cartItem.amount )

            // This is probably the simplest way to write this, only runs through if statement if the amount is 0 rather than filtering for no reason
            if(removeExistingItem.amount === 0)
            {
                // This filtered solution is probably simpler and quicker than to run an (for and if loop) to find the id and then splice the element from the array
                const newCartItems = state.cartItems.filter((cartItem) => cartItem.amount > 0);
                // This statement below is only possible through redux
                state.cartItems = newCartItems;
            } 
        }
    }
});


export const cartItemSliceActions = cartItemSlice.actions;
export default cartItemSlice;