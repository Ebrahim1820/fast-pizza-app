import { useSelector } from "react-redux";

function Username() {
  // to get state from redux should use
  // useSelectore hook
  const userName = useSelector((state) => state.user.username);

  if (!userName) return null;
  return (
    <div className="hidden px-2 py-2 text-lg font-bold text-stone-800 md:block">
      <p>Hey {userName}😊</p>
    </div>
  );
}

export default Username;
