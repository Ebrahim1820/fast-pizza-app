// import { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

// eslint-disable-next-line react/prop-types
function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  //   const [number, setNumber] = useState(0);

  const dispatch = useDispatch();

  function hendleIncrease() {
    // setNumber((number) => number + 1);
    dispatch(increaseItemQuantity(pizzaId));
  }

  function hendleDecrease() {
    // if (number > 0) setNumber((number) => number - 1);

    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-1 md:gap-3">
      <button
        className="w-5 rounded-full bg-lime-400  text-stone-800"
        onClick={hendleDecrease}
      >
        -
      </button>
      <span className="text-sm font-medium">{currentQuantity}</span>

      {/* <input
        type="text"
        value={currentQuantity}
        className="mx-1 h-6 w-8 rounded-md border-2 border-stone-500 text-center "
      ></input> */}

      <button
        className="w-5 rounded-full bg-lime-400 text-stone-800"
        onClick={hendleIncrease}
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQuantity;
