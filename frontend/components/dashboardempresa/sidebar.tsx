
import { ToggleLeft, UsersRound, User, Flag} from "lucide-react";


const menuItems = [
  { name: "Inicio", icon: <Flag className="h-6 w-6 mr-3" />, to: "/" },
  { name: "Lorem", icon: <UsersRound className="h-6 w-6 mr-3" />, to: "/" },
  { name: "Lorem", icon: <ToggleLeft className="h-6 w-6 mr-3" />, to: "/" },
  { name: "Perfil", icon: <User className="h-6 w-6 mr-3" />, to: "/perfil" },
];

export function SideBar(){
  return (
    <div className="bg-[#0A0B1E] h-full w-[250px] p-5 flex flex-col">
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
            <a href={item.to} className="flex items-center py-2 px-4 hover:bg-[#12142A] active:bg-[#12142A] rounded">
              {item.icon}
              <p className="text-white">{item.name}</p> 
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};