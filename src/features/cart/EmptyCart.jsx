import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      {/* <Link to="/menu">&larr; Back to menu</Link> */}
      <LinkButton to="/menu">&larr; Back to menu </LinkButton>

      <p className="mt-7 rounded-md border-2 border-yellow-400 bg-lime-300 px-2 py-4 text-center font-semibold">
        Your cart is still empty. Start adding some pizzas 😀
      </p>
    </div>
  );
}

export default EmptyCart;
