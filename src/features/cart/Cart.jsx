/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import CartItem from "./CartItem";
import { clearCart, getCart, getUserName } from "./cartSlice";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "./EmptyCart";

function Cart() {
  const cart = useSelector(getCart);
  const userName = useSelector(getUserName);
  console.log(cart.length);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 uppercase">
        Your cart, <span className="font-bold">{userName}</span>
      </h2>

      <ul className="divide-y divide-stone-300 border-b ">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className=" mt-6 space-x-2 py-2 text-xl font-semibold">
        {/* // <LinkButton to="/order/new">Order pizzas</LinkButton> */}
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleClearCart} type="secondary" disabled={false}>
          {" "}
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
