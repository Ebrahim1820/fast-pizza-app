/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import {
  clearCart,
  getTotalCartPrice,
  getCart,
  getUserName,
  addOrderToHistory,
} from "../cart/cartSlice";
import Button from "../../ui/button";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import LinkButton from "../../ui/LinkButton";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

//
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    position,
    status: addressStatus,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";
  // this hook is more popular to shows some error
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);

  const dispatch = useDispatch();

  const isSubmitting = navigation.state === "submitting";

  // if priority checkbox checked add %20 to total amount
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  if (!cart.length) return <EmptyCart />;
  const labelStyles =
    "mb-5 flex flex-col gap-2 font-semibold sm:flex-row sm:items-center";

  return (
    <div className=" px-4 py-3 ">
      <LinkButton to="/cart">&larr; Back to order </LinkButton>

      <h2 className="mb-8 mt-4 text-xl font-semibold capitalize text-stone-900">
        Ready to order? Lets go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST" className="border border-stone-300 p-2">
        <div className={labelStyles}>
          <label className=" sm:basis-40 ">First Name</label>
          <input
            className="inputField grow capitalize"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className={labelStyles}>
          <label className=" sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="inputField w-full  "
              type="tel"
              name="phone"
              required
            />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 font-semibold sm:flex-row sm:items-center">
          <label className=" sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="inputField w-full"
              type="text"
              disabled={isLoadingAddress}
              name="address"
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[10px] top-[22px] z-50 py-2 sm:top-[-6px]">
              <button
                onClick={(e) => {
                  e.preventDefault;
                  dispatch(fetchAddress());
                }}
              >
                <i className="fa fa-map-marker fa-lg text-blue-400 hover:text-blue-700"></i>
              </button>
            </span>
          )}
        </div>

        <div className="mb-6 flex items-center gap-5">
          <input
            className="checkbox"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            className="text-1x font-semibold text-stone-800"
            htmlFor="priority"
          >
            Want to you give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalCartPrice + priorityPrice)}`}
          </Button>

          <Button onClick={() => {}} type="secondary" disabled={false}>
            Cancel Order
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  // Error Handleing
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. we might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;

  // if every information is corret, create new order
  const newOrder = await createOrder(order);

  store.dispatch(addOrderToHistory(newOrder));
  // STORE to access Dispatch(clearCart())
  // to clear the cart after submitting
  // we can not directly use 'Dispatch(clearCart()) inside a function
  // so we can use this trick by calling 'store' here
  // DO NOT OVER USE, will make performance issue
  store.dispatch(clearCart());

  // inside a function we can not use useNavigate hook
  // it can only be used in component
  // so here we used "redirect(}" method
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
