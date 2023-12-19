/* eslint-disable no-unused-vars */
// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  //
  // this hook will featch data from another page
  // and wil not fetch from endpoint. for instance
  // FETCH MENU ITEMs
  const fetcher = useFetcher();

  useEffect(
    function () {
      // check if not fetched already and
      // state of fetcher is idle, by start it is 'IDLE'
      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap  items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-lime-500 px-3 text-sm font-semibold uppercase tracking-wide text-lime-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2  bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Delivery ⌚: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* List of Orders */}
      <ul className=" divide-y divide-stone-300 border-b border-t px-4 py-6">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className=" space-y-2 bg-stone-200 px-6 py-5">
        <p className="flex items-center justify-between text-sm font-medium text-stone-600 text-stone-800">
          Price pizza:
          <span className=" rounded-md bg-lime-400 px-2">
            {" "}
            {formatCurrency(orderPrice)}{" "}
          </span>
        </p>
        {priority && (
          <p className="flex items-center justify-between text-sm font-medium text-stone-600 text-stone-800">
            Price priority:
            <span className=" rounded-md bg-lime-400 px-2">
              {" "}
              {formatCurrency(priorityPrice)}
            </span>
          </p>
        )}
        <p className="flex items-center justify-between font-bold">
          To pay on delivery:{" "}
          <span className="rounded-md bg-lime-400 px-2 text-stone-800">
            {formatCurrency(orderPrice + priorityPrice)}
          </span>
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
