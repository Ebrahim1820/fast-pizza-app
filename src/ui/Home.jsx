import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./button";
import HistoryOrder from "./HistoryOrder";

//
function Home() {
  // read data from redux store
  const userName = useSelector((state) => state.user.username);
  const orderHistory = useSelector((state) => state.cart.orderHistory);
  const sortedOrderHistory = [...orderHistory].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return (
    <div className="text-black-600 absolute left-1/3 top-1/2 -translate-x-1/4 -translate-y-1/3 transform text-center font-semibold">
      <h1 className=" bg-grey-100 mb-8 bg-opacity-30 px-10 text-center text-2xl font-semibold md:text-3xl">
        The Best Pizza.
        <br />
        <span className="text-2lg text-gray-500 md:text-2xl">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {userName === "" ? (
        <CreateUser />
      ) : (
        <Button type="primary" to="/menu">
          Continue Ordering {userName} 😋
        </Button>
      )}
      {sortedOrderHistory.length > 0 && (
        <div className="my-16 w-full bg-opacity-50 text-gray-500">
          <h2 className="m-4 text-xl font-semibold"> Order History</h2>
          <ul className="divide-y divide-stone-400 border-t-4 px-2">
            {sortedOrderHistory.map((order) => (
              <HistoryOrder item={order} key={order.id} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
