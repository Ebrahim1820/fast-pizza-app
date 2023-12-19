/* eslint-disable react/prop-types */
import { formatCurrency } from "../../utils/helpers";

// eslint-disable-next-line no-unused-vars
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className=" space-y-1 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="rounded-md bg-yellow-400 px-2 font-bold text-stone-800">
          {formatCurrency(totalPrice)}
        </p>
      </div>
      <p className="text-sm capitalize italic text-stone-500 ">
        {isLoadingIngredients ? "Loading..." : ingredients.join(",")}
      </p>
    </li>
  );
}

export default OrderItem;
