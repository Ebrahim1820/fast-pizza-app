import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-100 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold uppercase text-stone-300 sm:space-x-6 ">
        <span className="text-yellow-500">{totalCartQuantity} pizzas</span>
        <span className="text-yellow-500">
          {formatCurrency(totalCartPrice)}
        </span>
      </p>

      <Link to="/cart" className="hover:text-blue-500">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
