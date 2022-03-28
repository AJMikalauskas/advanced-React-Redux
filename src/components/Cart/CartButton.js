import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import showingCartModalSlice, { showingCartModalActions } from '../../store/modal';

const CartButton = (props) => {
  //const cartModalRedux = useSelector(cartModal => cartModal.cartModal.showCartModal);
  const dispatch = useDispatch();

  const showCartModal = () => 
  {
    dispatch(showingCartModalSlice.actions.showCartModal());
  }
  return (
    <button className={classes.button} onClick={showCartModal}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  );
};

export default CartButton;
