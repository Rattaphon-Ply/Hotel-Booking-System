import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const goto = [
  { link: "/", label: "Home" },
  { link: "/rooms", label: "Rooms" },
  { link: "/about", label: "About" },
];

const LinkTo = () => {
  return (
    <div className="flex gap-2 items-center justify-center">
      {goto.map((item, index) => {
        return (
          <div key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive
                  ? "px-4 py-2 rounded-xl text-sm font-semibold bg-green-500 text-white shadow-md border border-green-300"
                  : "px-4 py-2 rounded-xl text-sm font-semibold bg-green-300 text-green-800 hover:bg-green-400 transition duration-300 border border-green-200"
              }
            >
              {item.label}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
export default LinkTo;
