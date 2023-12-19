/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { deleteItem } from "../features/cart/cartSlice";

function DeleteButton({ pizzaId }) {
  const dispatch = useDispatch();
  function handleDeleteCart() {
    dispatch(deleteItem(pizzaId));
  }
  return (
    <button onClick={handleDeleteCart}>
      <i className="fa fa-trash fa-lg text-red-400 hover:text-red-700"></i>
    </button>
  );
}

export default DeleteButton;
