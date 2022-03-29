import classes from './CartButton.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {showingCartModalActions } from '../../store/modal';

const CartButton = (props) => {
  //const cartModalRedux = useSelector(cartModal => cartModal.cartModal.showCartModal);
  const totalAmtOfItems = useSelector(cartBtn => cartBtn.cartItemLogic.totalOverallAmount);
  const dispatch = useDispatch();

  const showCartModal = () => 
  {
    dispatch(showingCartModalActions.showCartModal());
  }
  return (
    <button className={classes.button} onClick={showCartModal}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalAmtOfItems}</span>
    </button>
  );
};

export default CartButton;
