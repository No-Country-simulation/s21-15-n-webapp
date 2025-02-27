import { Link } from "react-router-dom";
import {
  FlagIcon,
  TrophyIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { ToggleLeft, UsersRound, User,  Key} from "lucide-react";


const menuItems = [
  { name: "Inicio", icon: <FlagIcon className="h-6 w-6 mr-3" />, to: "/" },
  { name: "Ranking", icon: <TrophyIcon className="h-6 w-6 mr-3" />, to: "/ranking" },
  { name: "Lorem", icon: <Key className="h-6 w-6 mr-3" />, to: "/lorem1" },
  { name: "Lorem", icon: <UsersRound className="h-6 w-6 mr-3" />, to: "/lorem2" },
  { name: "Lorem", icon: <BellIcon className="h-6 w-6 mr-3" />, to: "/lorem3" },
  { name: "Lorem", icon: <ToggleLeft className="h-6 w-6 mr-3" />, to: "/toggle" },
  { name: "Perfil", icon: <User className="h-6 w-6 mr-3" />, to: "/perfil" },
];

const SideBar = () => {
  return (
    <div className="bg-[#0A0B1E] h-full w-full p-5 flex flex-col">
      <h2 className="text-xl font-bold mb-5 text-white flex items-center">
        <img
          src="https://raw.githubusercontent.com/No-Country-simulation/s21-15-n-webapp/1857a87229a6361b345560c4be845b64247ec09b/frontend/src/assets/rocket.png"
          alt="Logo"
          className="h-6 w-6 mr-2 text-[#4F46E5]"
        />
        StartPerks
      </h2>
      <ul className="text-[#4F46E5] space-y-2 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link to={item.to} className="flex items-center py-2 px-4 hover:bg-[#12142A] active:bg-[#12142A] rounded">
              {item.icon}
              <p className="text-white">{item.name}</p> 
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;