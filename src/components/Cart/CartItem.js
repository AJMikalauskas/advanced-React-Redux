import { useDispatch } from 'react-redux';
import { cartItemSliceActions } from '../../cartItemSliceLogic';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price, id } = props;

const addItemToCartHandler = () =>
{
  dispatch(cartItemSliceActions.addItem({itemId: id, price: price}));
}

const removeItemFromCartHandler = () => 
{
  dispatch(cartItemSliceActions.removeItem({itemId: id}));
}

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemFromCartHandler}>-</button>
          <button onClick={addItemToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
