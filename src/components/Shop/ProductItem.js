import { useDispatch, useSelector } from 'react-redux';
import Card from '../UI/Card';
import ShoppingCartModal from '../UI/Modal';
import classes from './ProductItem.module.css';
import { cartItemSliceActions } from '../../cartItemSliceLogic';

const ProductItem = (props) => {
  const { id,title, price, description } = props;
//  I was testing the visiblity of this element based on the redux, helped me to figure out to put this conditional in the app.js
  //  const testRedux = useSelector(cartModalTest => cartModalTest.cartModal.showingCart);
  const dispatch = useDispatch();
  // Use Logic of adding to cart here
  const addItemToCart = () =>
  {
    dispatch(cartItemSliceActions.addItem({itemName: title, itemId: id, price: price}));
  }

  const cardAndOtherElements =
  <Card>
  <header>
    <h3>{title}</h3>
    <div className={classes.price}>${price.toFixed(2)}</div>
  </header>
  <p>{description}</p>
  <div className={classes.actions}>
    <button onClick={addItemToCart}>Add to Cart</button>
  </div>
</Card>;

  return (
    <li className={classes.item}>
      {/* { testRedux ? <ShoppingCartModal /> : cardAndOtherElements} */}
      {cardAndOtherElements}
    </li>
  );
};

export default ProductItem;
