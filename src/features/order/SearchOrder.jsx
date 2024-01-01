import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <>
      <div className="rounded-[20px]  shadow-xl  hover:bg-stone-200 ">
        <form
          onSubmit={handleSubmit}
          className="flex items-stretch rounded-sm py-1 "
        >
          <input
            className="
            ml-2 w-28 
            rounded-[20px] bg-lime-100 
            px-2
            text-sm 
            text-stone-800
             transition-all  
             duration-300 
             placeholder:text-stone-400
             focus:outline-none
             focus:ring 
             focus:ring-lime-300 
             sm:w-64 
             sm:focus:w-72"
            placeholder="Search order by Id.."
            value={query}
            onChange={handleSearch}
          />{" "}
          <button className="text-sm font-semibold text-stone-400  hover:text-lime-400  ">
            <i className="fa fa-search  px-1"></i>
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchOrder;
