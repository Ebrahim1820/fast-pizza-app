/* eslint-disable react/prop-types */
import { formatCurrency, formatDate } from "../utils/helpers";

// eslint-disable-next-line no-unused-vars
function HistoryOrder({ item }) {
  return (
    <li className=" space-y-1 px-2 py-3">
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">
          <span>Order ID: {item.id}&times; </span>
        </p>
        <>{formatDate(item.createdAt)}</>
        <div className="flex items-center ">
          {item.priority && <i className="fa fa-check text-red-600"></i>}
          <p className="rounded-md bg-yellow-400 px-2 font-bold text-stone-800">
            Price: {formatCurrency(item.orderPrice)}
          </p>
        </div>
      </div>
      {/* <p className="text-sm capitalize italic text-stone-500 ">
        {isLoadingIngredients ? "Loading..." : ingredients.join(",")}
      </p> */}
    </li>
  );
}
export default HistoryOrder;
