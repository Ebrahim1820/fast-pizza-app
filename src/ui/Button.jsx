/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Button({
  children,
  disabled,
  to,
  type,
  onClick,
  color = "bg-yellow-400",
}) {
  const base = `my-2 inline-block rounded-full text-sm
   ${color} font-semibold uppercase tracking-wide 
   text-stone-800 shadow-lg transition-colors 
   duration-300 hover:bg-lime-600 
   focus:outline-none bg-lime-400
   focus:ring focus:ring-lime-400 focus:ring-offset-2 
   disabled:cursor-not-allowed `;
  const styles = {
    primary:
      base +
      "border-2 hover:text-stone-100 border-lime-300 sm:px-4 py-2 px-3 md:py-3.5 sm:py-2.5 text-xs sm:text-sm",
    small:
      base +
      " border-2 border-lime-300 py-3 px-2 sm:px-4 md:px-4 md:py-2 text-xs",
    secondary: `my-2 inline-block rounded-full text-sm border-2
    border-stone-300 font-semibold uppercase tracking-wide 
    text-stone-800 shadow-lg transition-colors 
    hover:text-stone-100
    duration-300 hover:bg-stone-600
    focus:outline-none 
    focus:ring focus:ring-stone-400 focus:ring-offset-2 
    disabled:cursor-not-allowed sm:px-4 py-1.5 px-2 md:py-3.5 sm:py-2.5 text-xs sm:text-sm `,
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }

  if (onClick)
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${styles[type]} mx-2`}
      >
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={`${styles[type]} mx-2`}>
      {children}
    </button>
  );
}

export default Button;
