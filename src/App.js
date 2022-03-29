import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import { Fragment, useEffect, useState } from 'react';
import ShoppingCartModal from './components/UI/Modal';
import Notification from './components/UI/Notification';

function App() {
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
  const [isLoadingReq, setisLoadingReq] = useState(false);
  const [ifError, setIfError] = useState();

  useEffect(() => {
    // This if statement didn't work because if the cart item has o amount it will be removed, which means the PUT req will never get called
      // and considering, even if it was called, it would still result in the same error of having totalCost and totalQuantity as 0
        // when we want overall deletion from the whole DB if 0 exist -> internet solution is action creator thunks
    // if(cartStateTracker.cartItems.length >= 0) {

    const sendCartData = async() => {
      // Show original starting loading notification to alert user that the request is being made
        // Could handle notifcations state and JSX conditionals in the return below to show notifcations or do his way
          // useState for start loading notification
    setisLoadingReq(true);
    const response = await fetch("https://advanced-redux-a16d1-default-rtdb.firebaseio.com/cartItems.json",
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(cartStateTracker)
    });

    if(!response.ok)
    {
      // Put error notificatio in here if fail occurs
      setIfError(true);
      throw new Error('Sending Cart Data Failed!');
    }
    // if success display notifcation of success
    const respData = await response.json();
    setisLoadingReq(false);
    setIfError(false);
  }
  // }
    //cartStateTracker
  }, [cartStateTracker]);

  const errorNotificationJSX = <Notification title="Request Failed!" message="Sending Cart Data Failed!"/>;
  const sucessNotificationJSX = <Notification title="Request Successful!" message="Sending Cart Data Succeeded!"/>
  return (
    <Layout>
      {isLoadingReq && <Notification title="Request Has Been Sent!" message="The Loading started..."/>}
      {ifError ? errorNotificationJSX : sucessNotificationJSX}
      {testRedux ? <ShoppingCartModal /> : cartAndProductsComponents}
    </Layout>
  );
}

export default App;
