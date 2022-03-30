import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useDispatch, useSelector} from "react-redux";
import { Fragment, useEffect, useState } from 'react';
import ShoppingCartModal from './components/UI/Modal';
import Notification from './components/UI/Notification';
import { showingCartModalActions } from './store/modal';
import {fetchCartData, sendCartData } from "../src/store/cart-fetchActionsSlice";

// This is so the request isn't sent on the start of the page, not what I would expect 
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const testRedux = useSelector(cartModalTest => cartModalTest.cartModal.showingCart);
  const cartAndProductsComponents = <Fragment>
    <Cart />
      <Products />
  </Fragment>;

  // Track Overall State of the cart which contains the cart items array, totalCostAmt, and totalOverallAmt
    // Run useEffect to see for change in the overall cart state and if there is override cart with new data and have previously stored data,
      // only true changes come from PUT request -> overrides data
  const cartStateTracker = useSelector(state => state.cartItemLogic);

  // useState for notifications, attempt on my own
  // const [isLoadingReq, setisLoadingReq] = useState(false);
  // const [ifError, setIfError] = useState();
  //const dispatch = useDispatch();
  const notification = useSelector(state => state.cartModal.notification);

  // Create a sepearate useEffect() with an empty dependency array so that it fetches and GETs data from firebase only on the start of the page.
    // dispatch never changes so this useEffect should never rerun
  useEffect(() =>
  {
    dispatch(fetchCartData());
  }, [dispatch]);
  // This causes a problem because it alters the cartItemSliceLogic.js properties which is called as a dependency in the below useEffect();
    // This is a major problem because we do need to track changes in the cart but  we MUST change the data on the load of the page
      // to show the firebase data. This needs to be fixed!

  useEffect(() => {
    // Call sendCartData function from cartItemSliceLogic and use useSelecotr function to get and send up with the cart data
      // The cartData contains the cartItems array, overallCost and overall quantity

      if(isInitial) 
      {
        // set to false so http calls are only made on adding of items just not on start of page
        isInitial = false;
        return;
      }
      if(cartStateTracker.changed) {
      dispatch(sendCartData(cartStateTracker));
      }
    // This if statement didn't work because if the cart item has o amount it will be removed, which means the PUT req will never get called
      // and considering, even if it was called, it would still result in the same error of having totalCost and totalQuantity as 0
        // when we want overall deletion from the whole DB if 0 exist -> internet solution is action creator thunks
    // if(cartStateTracker.cartItems.length >= 0) {

  //   const sendCartData = async() => {

  //     // Show original starting loading notification to alert user that the request is being made
  //       // Could handle notifcations state and JSX conditionals in the return below to show notifcations or do his way
  //         // useState for start loading notification
  //   // setisLoadingReq(true);
    
  //   //This is an auto created action creator thunk by using dispatch and calling a reducer action through it
  //     // But we can create our own so this isn't the end reuslt of lecture #260
  //   dispatch(showingCartModalActions.showNotification({ status: "Pending...",title: "Request Is Loading", message: "Your Request is being processed!"}));
  //   //console.log(notification.status);
  //   const response = await fetch("https://advanced-redux-a16d1-default-rtdb.firebaseio.com/cartItems.json ",
  //   {
  //     method: 'PUT',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(cartStateTracker)
  //   });

  //   if(!response.ok)
  //   {
  //     // Put error notificatio in here if fail occurs
  //     //setIfError(true);

  //     // Don't dispatch error here because other errors can occur in the fetch request, so this may not be as useful as if you .catch()
  //       // which will catch any errors from the whole async function.
  //     //dispatch(showingCartModalActions.showNotification({status: 'error',title: "Request Failed!", message: "Your Request failed to Load due to an error!"}));
  //     throw new Error('Sending Cart Data Failed!');
  //   }
  //   // if success display notifcation of success
  //   //const respData = await response.json();
  //   dispatch(showingCartModalActions.showNotification({status: 'success',title: "Request Succeeded!", message: "Your Request Succeeded in Loading!"}));
  //   // setisLoadingReq(false);
  //   // setIfError(false);
  // }
  // // .catch() is able to catch an error in the overall function, ratehr than only catching an error after the fetch call,
  //   // it's better to do so via the .catch() method 
  //     // Stop the data or function from being called and sending request if isInitial is tru, outside component so value doesn't rerender on component on rerender
    // if(isInitial) 
    // {
    //   // set to false so http calls are only made on adding of items just not on start of page
    //   isInitial = false;
    //   return;
    // }
      
  // sendCartData().catch((error) => {
  //   dispatch(showingCartModalActions.showNotification({status: 'error',title: "Request Failed", message: error.message}));
  // }
  // )
  // }
    //cartStateTracker
  }, [cartStateTracker, dispatch]);

  // const errorNotificationJSX = <Notification title="Request Failed!" message="Sending Cart Data Failed!"/>;
  // const sucessNotificationJSX = <Notification title="Request Successful!" message="Sending Cart Data Succeeded!"/>
  return (
    <Fragment>
      {/* Null is a falsey value so only ifthe notification is an object does this notification show, though for right now since it runs on the
      start of the page, it will always return that the request succeeded. */}
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
    <Layout>
      {/* {isLoadingReq && <Notification title="Request Has Been Sent!" message="The Loading started..."/>}
      {ifError ? errorNotificationJSX : sucessNotificationJSX} */}
      {testRedux ? <ShoppingCartModal /> : cartAndProductsComponents}
    </Layout>
    </Fragment>
  );
}

export default App;
