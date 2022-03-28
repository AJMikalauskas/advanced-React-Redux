import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from "react-redux";
import { Fragment } from 'react';
import ShoppingCartModal from './components/UI/Modal';

function App() {
  const testRedux = useSelector(cartModalTest => cartModalTest.cartModal.showingCart);
  const cartAndProductsComponents = <Fragment>
    <Cart />
      <Products />
  </Fragment>;
  return (
    <Layout>
      {testRedux ? <ShoppingCartModal /> : cartAndProductsComponents}
    </Layout>
  );
}

export default App;
