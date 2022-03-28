import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Cart from "../Cart/Cart";
import styles from "./Modal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { showingCartModalActions } from "../../store/modal";
// Replace context with redux

const Backdrop = () => {
  const showCartSelector = useSelector(
    (cartModal) => cartModal.cartModal.showingCart
  );
  const dispatch = useDispatch();
  const stopShowingCart = () =>
  {
    dispatch(showingCartModalActions.stopShowingCartModal());
  }
  return (
    //<div>{showCartSelector && 
    <div className={styles.backdrop} onClick={stopShowingCart}></div>
    //}</div>
  );
};

const Modal = () => {
//   const showCartSelector = useSelector(
//     (cartModal) => cartModal.cartModal.showingCart
//   );
  return (
    <div className={styles.modal}>
    <Cart />
  </div>
    // <div>
    //   {/* {showCartSelector && ( */}
    // {/* )
    // </div> */}
  );
};

const ShoppingCartModal = (props) => {
  return (
    <React.Fragment>
      {/* onClose={props.onClose} in both Backdrop and Modal tags */}
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      ;
      {ReactDOM.createPortal(
        <Modal />,
        document.getElementById("overlay-root")
      )}
      ;
    </React.Fragment>
  );
};

export default ShoppingCartModal;
