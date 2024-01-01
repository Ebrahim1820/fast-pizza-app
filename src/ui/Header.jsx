import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header
      className=" 
      
      mb-1 
      flex items-center
      justify-between
      border 
      border-stone-600 
      bg-lime-400 uppercase
      sm:p-4
      sm:px-6
      
      "
    >
      <Link
        to="/"
        className="px-2 py-3 text-lg font-bold tracking-[5px] text-stone-800 hover:text-stone-100"
      >
        Fast Pizza Co.
      </Link>
      <SearchOrder />

      <Username />
    </header>
  );
}

export default Header;
