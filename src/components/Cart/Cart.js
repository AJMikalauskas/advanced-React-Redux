import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItemsSelector = useSelector(cartItem => cartItem.cartItemLogic.cartItems);
  const totalCostOfItemsSelector = useSelector(cartItem => cartItem.cartItemLogic.totalCostAmt);
  //const dispatch = useDispatch();
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
      {cartItemsSelector.map(product => 
          <CartItem
            key={product.itemId}
            id={product.itemId}
            title={product.itemName}
            quantity={product.amount}
            total={product.totalPrice}
            price={product.price}
          />)}
      </ul>
      <div className={classes.total}>
      <span>Your Total:</span>
      <span>{`$${totalCostOfItemsSelector.toFixed(2)}`}</span>
      </div>
    </Card>
  );
};

export default Cart;
