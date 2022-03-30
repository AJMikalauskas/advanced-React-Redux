import { showingCartModalActions } from "./modal";
import { cartItemSliceActions } from "../cartItemSliceLogic";

export const fetchCartData = () => {
    return async(dispatch) => {
        // This acts as the function below but is a GET request so that when you reload the page all the data isn't erased.
        const fetchData = async() => {
            const response = await fetch("https://advanced-redux-a16d1-default-rtdb.firebaseio.com/cartItems.json");

            // check for error before setting the data equal to response.json();
                // escape function if error occurs so that more errors don't exist, no need for return as throw new Error will exit the function the same way
            if(!response.ok)
            {
                throw new Error("The response didn't return ok!");
            }
            const data = await response.json();

            return data;
        };

        try
        {

            const cartData = await fetchData();
            // Since the replace cart changes all the states which are empty to what's in firebase by dispatching this action with the GET
                // to empty or no data to what's in firebase so relaod doesn't delete the data.
                    // ran into an error where the cartItems becomes undefined with no items, needs to be empty array not undefined
                        // or else an error will occur within the .map() in Cart.js
            dispatch(cartItemSliceActions.replaceCart({
                ...cartData,
                cartItems: cartData.cartItems || []
            }));
        }
        catch(error)
        {
            dispatch(showingCartModalActions.showNotification({status: 'error',title: "Request Failed", message: error.message}));
        }
    }
}

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
    const response = await fetch("https://advanced-redux-a16d1-default-rtdb.firebaseio.com/cartItems.json",
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
