import { Link } from "react-router-dom";
import Logo from "./Logo";
import LinkTo from "./LinkTo";
import DropdownProfile from "./DropdownProfile";


const MainNav = () => {
  return (
    <nav className="shadow-md bg-gradient-to-r from-green-600 via-emerald-500 to-green-400">
      <div className="flex justify-between p-4 mx-4">
        <Logo />
        <LinkTo />
        <DropdownProfile />
      </div>
    </nav>
  );
};
export default MainNav;
